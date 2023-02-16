import Link from "next/link"
import  Router from "next/router"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { api } from "../services/apiClient"


export default function Product() {
    const [name, setName] = useState<string>("")
    const [price, setPrice] = useState<string>()
    const [description, setDescription] = useState<string>("")
    const [category_id, setCategory_id] = useState<string>("f48ca0b5-7bf7-465c-b293-e3f4ca409f44")
    async function handleCreateProduct(e: FormEvent) {
        e.preventDefault();
        const data = {
            name,
            price,
            description,
            category_id
        }
        await api.post('/product', data )
        toast.success("produto criado com sucesso!!")
        Router.push('/myproducts')
    }
    return (
        <div className=" w-screen h-screen">
            <div className="w-full flex justify-center items-center h-[20%] bg-red-400 shadow-2xl">
                <img className="rounded-full h-40 w-40" src="/logo.jpg" alt="" />
            </div>
            <div className="w-full h-4/5 flex flex-col items-center">
                <p className="w-[40%] text-red-600 font-extrabold text-4xl">Novo Produto</p>
                <form
                    onSubmit={(e) => handleCreateProduct(e)}
                    className=" w-5/6 md:w-2/5 flex-col gap-2 text-red-600 font-bold flex mt-10 ">
                    <div className="w-full h-48 flex justify-center items-center rounded-lg bg-red-100">
                        <p className="text-5xl font-black text-red-600">+</p>
                    </div>
                    <select
                        onChange={(e) => setCategory_id(e.target.value)}
                        className="w-full px-3 h-10 rounded-lg bg-red-100 " name="" id="">
                        <option
                            value="f48ca0b5-7bf7-465c-b293-e3f4ca409f44">
                            pizzas
                        </option>
                        <option
                            value="587d0330-5298-4808-8f9f-c053be0ba1db">
                            bebidas
                        </option>
                        <option
                            value="2d4e5bf0-30cd-48f3-b332-222fc4df8656">
                            beirutes
                        </option>
                    </select>
                    <input
                        onChange={e => setName(e.target.value)}
                        value={name}
                        className="w-full px-3 placeholder:text-red-400 h-10 rounded-lg bg-red-100 "
                        placeholder="Digite o nome do novo produto"
                        type="text" />
                    <input
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        className="w-full px-3 h-10 placeholder:text-red-400 rounded-lg bg-red-100 "
                        placeholder="Digite o preço"
                        type="number" />
                    <input
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        className="w-full px-3 h-16 placeholder:text-red-400  rounded-lg bg-red-100 "
                        placeholder="Descreva o seu produto"
                        type="text" />
                    <button className="w-full h-10 text-white rounded-lg bg-green-400">Cadastrar</button>
                </form>
                <Link
                href="/myproducts" 
                className="w-2/5 h-10 bg-red-400 flex justify-center items-center text-white rounded-lg mt-2">
                    Voltar
                    </Link>
            </div>
        </div>
    )
}