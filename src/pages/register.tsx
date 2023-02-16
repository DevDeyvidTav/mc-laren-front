import Image from "next/image"
import { FormEvent, useContext, useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { AuthContext } from "../contexts/AuthContext"

export default function Auth() {
    const [error, setError] = useState<string | undefined>()
    const {signUp} = useContext(AuthContext)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    async function handleRegister(e:FormEvent){
        e.preventDefault()
        let data = {
                name,
                email,
                password: password1
        }
        password1 === password2 ? await signUp(data)  : console.log("as senhas não coincidem")
    }
    const [visible, setVisible] = useState<boolean>(false)
    const inputType = visible ? "text" : "password"
    return (
        <div className="flex w-screen h-screen max-w-full flex-col">
            <div
                className="w-full h-1/4 justify-center flex bg-red-400">
                <img src="/logo.jpg" width={100} className="w-48" height={100}  />
            </div>
            <div className="w-full h-3/4 flex items-center flex-col">
                <p className="text-2xl mt-5 w-full text-center font-bold text-[#EA1D2C]">
                    Registre-se!
                </p>
                <form onSubmit={e => handleRegister(e)} className="flex flex-col mt-10 gap-1 w-[60%] md:w-[30%]">
                    <input value={name} onChange={e => setName(e.target.value)} type="name" placeholder="Digite o seu nome" className="border pl-3 border-black h-10 rounded-xl" required />
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Digite o seu email" className="border pl-3 border-black h-10 rounded-xl" required />
                    <div  className="flex">
                        <input value={password1} onChange={e => setPassword1(e.target.value)} type={inputType} placeholder="Digite a sua senha" className="border pl-3 border-black border-r-white w-[90%] h-10 rounded-xl rounded-r-none" required />
                        <p
                            onClick={() => setVisible(!visible)}
                            className="border flex items-center justify-center  border-black w-[10%] rounded-xl cursor-pointer rounded-l-none">
                            {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </p>
                    </div>
                    <div className="flex">
                        <input value={password2} onChange={e => setPassword2(e.target.value)} type={inputType}
                            placeholder="confirme sua senha" className="border pl-3 border-black border-r-white w-[90%] h-10 rounded-xl rounded-r-none" required />
                        <p
                            onClick={() => setVisible(!visible)}
                            className="border flex items-center justify-center  border-black w-[10%] rounded-xl cursor-pointer rounded-l-none">
                            {visible ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </p>
                    </div>

                    <button className="bg-red-400 h-10 rounded-xl text-white">Registrar</button>
                </form>
                <p className="text-[#EA1D2C] font-bold mt-5">
                    Já possui cadastro?
                </p>
                <a className="text-red-400 font-bold " href="/auth">acesse sua conta</a>
                <p className="text-[#EA1D2C] font-bold mt-10">Você é o administrador?</p>
                <a className="text-red-400 font-bold" href="/admin/auth">acesse o dashboard</a>
            </div>
        </div>
    )
}