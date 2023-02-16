import { createContext, ReactNode, useEffect, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthentication } from '../hooks/useAdminAuth';

export interface ProductProps{
  id: string,
  name: string,
  price: string,
  description: string,
  create_at: string,
  updated_at: string,
  categoryId: string
}
export interface OrderDraftProps {
  adress?: string
  create_at: string
  draft: boolean
  id: string
  name: string
  phone: string
  status: boolean
  updated_at: string
  user_id: string
  total_price?: number
  payment_method: string
}

type AuthContextData = {
  user?: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
  adminUser?: any
  orderDraft?: OrderDraftProps
  setOrderDraft: Function
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch {
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {

    // tentar pegar algo no cookie
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { id, name, email } = response.data;

        setUser({
          id,
          name,
          email
        })

      })
        .catch(() => {
          //Se deu erro deslogamos o user.
          signOut();
        })
    }


  }, [])
  const [user, setUser] = useState<UserProps>()
  const [adminUser, setAdminUser] = useState<undefined | string[]>(undefined)
  const { auth } = useAuthentication()
  const isAuthenticated = !!user;
  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      setAdminUser(user)
    })
  }, [auth])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })
      // console.log(response.data);

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
        path: "/" // Quais caminhos terao acesso ao cookie
      })

      setUser({
        id,
        name,
        email,
      })

      //Passar para proximas requisiçoes o nosso token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      //Redirecionar o user para /dashboard
      Router.push('/')


    } catch (err) {
      console.log("ERRO AO ACESSAR ", err)
    }
  }
  const [orderDraft, setOrderDraft] = useState<OrderDraftProps>()
  async function verifyDraftOrder() {

    await api.get('/order/verifydraft',
      {
        params: { user_id: user?.id }
      }).then(res => setOrderDraft(res.data))

  }
  useEffect(() => {
    verifyDraftOrder()
  }, [])
  async function signUp({ name, email, password }: SignUpProps) {
    try {

      const response = await api.post('/users', {
        name,
        email,
        password
      })

      console.log("CADASTRADO COM SUCESSO!")

      Router.push('/auth')

    } catch (err) {
      console.log("erro ao cadastrar ", err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, adminUser, orderDraft, setOrderDraft }}>
      {children}
    </AuthContext.Provider>
  )
}