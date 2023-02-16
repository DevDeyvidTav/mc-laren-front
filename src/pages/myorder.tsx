import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Header } from "../components/header";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/apiClient";
import { canSSRAuth } from "../utils/canSSRAuth";
import { DetailedOrderProps } from "./listorders";

export default function MyOrder() {
    const { user } = useContext(AuthContext)
    const user_id = user?.id
    const [order, setOrder] = useState<DetailedOrderProps[]>()
    async function getDetailedOrder(order_id: string) {
        if (order_id) {
            try {
                const res = await api.get('/order/detail', {
                    params: { order_id: order_id }
                })
                setOrder(res.data)
            } catch (error) {
                console.error(error)
            }
        }
        else {
            setOrder(undefined)
        }

    }
    async function getCornfirmedOrder() {
        try {
            const res = await api.get('/order/user/id', {
                params: { user_id }
            })
            getDetailedOrder(res.data.id)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getCornfirmedOrder()
    }, [])
    console.log(order)
    const client = order ? order[0].Order.name : undefined
    const value = order ? order[0].Order.total_price : undefined
    const paymentMethod = order ? order[0].Order.payment_method : undefined
    const status = order ? order[0].Order.status === false ? "Em produção" : "Em rota de entrega" : undefined

    async function deleteOrder(e: any) {
        e.preventDefault();

        try {
            await api.delete('/order', {
                params: { order_id: order? order[0].Order.id: undefined },
            })
            toast.success('pedido cancelado')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="w-screen h-screen max-w-full">
            <Header />
            {
                order ?
                    <div className="bg-red-400 mt-5 md:w-1/3 p-4 rounded mx-auto text-white text-xl font-bold">
                        <p className="">Cliente: <span className="text-base">{client}</span></p>
                        <div>Itens:
                            {
                                order ?
                                    order.map((order, i) => {
                                        return (
                                            <div className="text-base flex gap-2">
                                                <p>
                                                    {i + 1 + "."} {order.Product.name}
                                                </p>
                                                <p>
                                                    Qtd: {order.amount}
                                                </p>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="hidden"></div>
                            }


                        </div>
                        <p>Valor: <span className="text-base">R${value}</span></p>
                        <p>Forma de pagamento: <span className="text-base">{paymentMethod}</span></p>
                        <p>Status: <span className="textbase">{status}</span></p>
                        <p className="text-sm mt-2">-Seu pedido pode demorar de 30 - 60 minutos para ficar pronto, dependendo da demanda.</p>

                        <button 
                        onClick={deleteOrder}
                        className="rounded-md bg-white mx-auto text-red-400 hover:bg-red-500 hover:duration-500 px-3 mt-2 hover:text-white">
                            cancelar
                        </button>
                    </div>
                    :
                    <div className="bg-red-400 w-5/6 mx-auto flex flex-col items-center rounded-md p-5 mt-10 h-32">
                        <h3 className="w-full text-center text-xl text-white">Você nao possui pedidos em aberto</h3>
                        <Link href="/cart">
                            <button className="rounded-md bg-white w-56 h-8 mx-auto font-bold text-red-400 hover:bg-red-500 hover:duration-500 px-3 mt-2 hover:text-white">
                                Faça um pedido
                            </button>
                        </Link>
                    </div>
            }
            <Link className="bg-zinc-400 mt-5 hover:bg-zinc-500 hover:duration-500 w-1/5 text-xl mx-auto text-white font-bold rounded-full h-12 flex items-center justify-center" href="/"> Voltar</Link>
        </div>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
      props: {}
    }
  })