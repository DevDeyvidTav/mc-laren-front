import Link from "next/link";
import { useContext, useEffect } from "react";
import { Header } from "../components/header";
import { AuthContext } from "../contexts/AuthContext";
import { useAuthentication } from "../hooks/useAdminAuth";
import {IoLogOutOutline} from "react-icons/io5"
import { useVerifyAdmin } from "../hooks/useVerifyAdmin";

export default function dashboard(){
    const { adminUser } = useContext(AuthContext)
    const { logout } = useAuthentication()
    useEffect(() => {
        useVerifyAdmin(adminUser)
    }
        , [adminUser])
    return (
        <div className="w-screen h-screen max-w-full">
            <Header/>
            <h2 className="w-full text-center text-4xl font-bold text-red-500 py-5">Área do administrador</h2>
            <ul className="w-full text-white text-xl font-bold flex flex-col items-center gap-2">
                <li
                className="bg-red-400 h-12 md:w-2/5 w-4/5 flex ">
                    <Link 
                    className="w-full h-full justify-center items-center flex"
                    href="/myproducts">
                        Meus produtos
                    </Link>
                </li>
                <li
                className="bg-red-400 md:w-2/5 w-4/5 h-12 flex justify-center items-center"
                >
                   <Link 
                   className="w-full h-full justify-center items-center flex"
                   href="/listorders">
                        Lista de pedidos
                    </Link>
                </li>
                <li
                className="bg-red-400 md:w-2/5 w-4/5 flex justify-center items-center h-12"
                >
                    <Link 
                    className="w-full h-full justify-center items-center flex"
                    href="/delivery">
                        Pedidos esperando entrega
                    </Link>
                </li>
                <button 
                onClick={logout}
                className="bg-red-400 w-4/5 md:w-2/5 h-24 flex items-center justify-center gap-2 text-2xl font-extrabold">
                <IoLogOutOutline/>
                Encerrar sessão
            </button>
            </ul>
            
        </div>
    )
}