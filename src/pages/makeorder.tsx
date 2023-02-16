import { api } from "../services/apiClient"
import { FormEvent, useContext, useEffect, useState } from "react"
import { canSSRAuth } from "../utils/canSSRAuth"
import Link from "next/link"
import { AuthContext } from "../contexts/AuthContext"
import Router from "next/router"
import { Header } from "../components/header"

interface ProductProps {
    name: string,
    id: string
}
interface ProductSelectedProps {
    name: string,
    id: string,
    description: string,
    price: number
}


export default function MakeOrder() {
    const { orderDraft } = useContext(AuthContext)
    const order_id = orderDraft?.id
    const [productSelected, setProductSelected] = useState<ProductSelectedProps>()
    const [category, setCategory] = useState("587d0330-5298-4808-8f9f-c053be0ba1db")
    const [product, setProduct] = useState<ProductProps[] | []>()
    const [productSelected_id, setProductSelected_id] = useState<string>()
    const [amount, setAmount] = useState<string>("1")
    async function getProductByCategory() {
        await api.get('category/product', {
            params: {
                category_id: category
            }
        }
        )
            .then(res => setProduct(res.data))
    }
    useEffect(() => {
        getProductByCategory()
    }, [category])
    useEffect(() => {
        if (category === "f48ca0b5-7bf7-465c-b293-e3f4ca409f44") {
            return setProductSelected_id("27206c08-47d6-4a39-85a2-f1b480e37d19")
        }
        else if (category === "587d0330-5298-4808-8f9f-c053be0ba1db") {
            return setProductSelected_id("385398bc-32e3-441d-9208-2afc3f8dfc35")
        }
        else if (category === "2d4e5bf0-30cd-48f3-b332-222fc4df8656") {
            return setProductSelected_id("7e751fbe-fd39-4de9-bf8b-7d2e5e5a634a")
        }
        else return setProductSelected_id("outra coisa")
    }, [category])
    async function findProductById() {
        try {
            await api.get('/product/id', {
                params: {
                    product_id: productSelected_id
                }
            }).then(res => setProductSelected(res.data))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        findProductById()
    }, [productSelected_id])
    useEffect(() => {
        if (Number(amount) < 0) {
            return setAmount("0")
        }
    })
    async function addItem(e: FormEvent) {
        e.preventDefault()
        try {
            await api.post('/order/add', {
                order_id,
                product_id: productSelected_id,
                amount: Number(amount)
            })
            Router.push('/cart')
        } catch (error) {
            console.log(error)
        }

    }
  
    return (
        <div className="w-screen h-screen max-w-full">
            <Header />
            <div className="w-4/5 md:w-3/5 mx-auto h-4/5 mt-3 rounded-md flex flex-col gap-2 shadow-2xl items-center shadow-red-400">
                <form
                    className="w-full flex flex-col items-center "
                    action="">
                    <h3
                        className="text-xl font-bold">
                        adicione suas preferencias no carrinho
                    </h3>
                    <h3
                        className="font-semibold w-2/3 md:w-1/2 text-start">
                        selecione a categoria do lanche desejado
                    </h3>
                    <select
                        onChange={e => setCategory(e.target.value)}
                        className="w-2/3 md:w-1/2 bg-red-100 text-red-500 h-12"
                        name=""
                        id="">
                        <option
                            value="587d0330-5298-4808-8f9f-c053be0ba1db">
                            Bebidas
                        </option>
                        <option
                            value="f48ca0b5-7bf7-465c-b293-e3f4ca409f44">
                            Pizzas
                        </option>
                        <option
                            value="2d4e5bf0-30cd-48f3-b332-222fc4df8656">
                            Beirute
                        </option>
                    </select>
                    <h3 className="font-semibold w-2/3 md:w-1/2 text-start">Selecione o lanche</h3>
                    <select
                        onChange={e => setProductSelected_id(e.target.value)}
                        className="w-2/3 md:w-1/2 bg-red-100 h-12 text-red-500 " name="" id="">
                        <option value="">Selecione um item</option>
                        {product?.map((product, i) => {
                            return (
                                <option
                                    key={i}
                                    value={product.id}>
                                    {product.name}
                                </option>
                            )
                        })}
                    </select>
                    <h3
                        className="text-md font-semibold w-2/3 md:w-1/2">
                        Detalhes do item selecionado
                    </h3>
                    <div
                        className="w-2/3 md:w-1/2 h-64 border border-transparent gap-5 text-red-500 justify-center flex flex-col rounded-lg overflow-y-scroll bg-red-100">
                        {
                            productSelected ?
                                <div>
                                    <div
                                        className="flex flex-col p-2 items-center gap-2 w-full">


                                        <p><span className="font-bold">Nome:</span> {productSelected?.name}</p>
                                        <p><span className="font-bold">Descriçao: </span>{productSelected?.description}</p>

                                        <p><span className="font-bold">Preço: </span>R${productSelected?.price}</p>
                                        <p className="font-bold">Quantidade:</p>
                                        <div className="flex items-start gap-2">
                                            <p onClick={() => setAmount(String(Number(amount) - 1))}>
                                                -
                                            </p>
                                            <input
                                                onChange={e => setAmount(e.target.value)}
                                                value={amount}
                                                className="w-10 text-center bg-red-100 border rounded-md border-red-500 h-6"
                                                type="number" />
                                            <p onClick={() => setAmount(String(Number(amount) + 1))}>
                                                +
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        className="w-full rounded-md border border-red-500 flex justify-center">
                                        {productSelected ? `Total: R$${Number(amount) * productSelected.price}` : ""}
                                    </div>
                                </div>
                                :
                                <p className="w-full text-center text-red-500">Nenhum lanche selecionado</p>
                        }
                    </div>
                    <button
                        onClick={(e) => addItem(e)}
                        className={`${productSelected ? "" : "pointer-events-none cursor-not-allowed bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"} bg-green-400 mt-8 text-white font-semibold text-xl hover:bg-green-500 px-10 p-1 rounded`}>
                        Adicionar ao carrinho
                    </button>

                </form>
                <Link
                    className="bg-zinc-400 w-40 text-center text-white font-semibold p-1 rounded-md hover:bg-zinc-500 hover:duration-500"
                    href="/cart">
                    Voltar
                </Link>
            </div>

        </div>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})