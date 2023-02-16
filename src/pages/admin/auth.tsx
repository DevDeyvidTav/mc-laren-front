import Image from "next/image"
import { FormEvent, useContext, useEffect, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { AuthContext } from "../../contexts/AuthContext"
import { useAuthentication } from "../../hooks/useAdminAuth"
import { useVerifyAdminInAuth } from "../../hooks/useVerifyAdminInAuth"



export default function AdminAuth() {
    const {adminUser} = useContext(AuthContext)

    const [visible, setVisible] = useState<boolean>(false)
    const inputType = visible ? "text" : "password"
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useAuthentication()
    const handleLogin = async (e:FormEvent) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
        try {
            await login(data)
        }
        catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        useVerifyAdminInAuth(adminUser)
    }, [adminUser])
    return (
        <div className="flex w-screen h-screen max-w-full flex-col">
            <div
                className="w-full h-1/4 justify-center flex bg-red-400">
                <img src="/logo.jpg" width={100} className="w-48" height={100} />
            </div>
            <div className="w-full h-3/4 flex items-center flex-col">
                <p className="text-2xl mt-5 w-full text-center font-bold text-[#EA1D2C]">
                    Entre e monitore os pedidos !
                </p>
                <form 
                onSubmit={e => handleLogin(e)}
                className="flex flex-col mt-10 gap-1 w-[60%] md:w-[30%]">
                    <input type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Digite o seu email"
                        className="border pl-3 border-black h-10 rounded-xl"
                        required />
                    <div className="flex">
                        <input type={inputType}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Digite a sua senha"
                            className="border pl-3 border-black border-r-white w-[90%] h-10 rounded-xl rounded-r-none"
                            required />
                        <p
                            onClick={() => setVisible(!visible)}
                            className="border flex items-center justify-center  border-black w-[10%] rounded-xl cursor-pointer rounded-l-none">
                            {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </p>
                    </div>
                    <button className="bg-red-400 h-10 rounded-xl text-white">Entre</button>
                </form>
                <p className="text-[#EA1D2C] font-bold mt-5">
                    Não é administrador?
                </p>
                <a className="text-red-400 font-bold " href="../auth">entre e faça um pedido</a>
            </div>
        </div>
    )
}
