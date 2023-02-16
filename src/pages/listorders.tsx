
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Header } from "../components/header";
import { Order } from "../components/Order";
import { AuthContext, OrderDraftProps, ProductProps } from "../contexts/AuthContext";
import { useAuthentication } from "../hooks/useAdminAuth";
import { useVerifyAdmin } from "../hooks/useVerifyAdmin";
import { api } from "../services/apiClient";

interface OrderProps {
    id: string,
    phone: string,
    adress: string,
    status: boolean,
    draft: boolean,
    name: string,
    user_id: string,
    total_price: number,
    payment_method: string
}
export interface DetailedOrderProps {
    Order: OrderDraftProps
    Product: ProductProps
    amount: number
    create_at: string
    id: string
    orderId: string
    productId: string
    updated_at: string
}

export default function ListOrders() {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState();
    const [detailedOrder, setDetailedOrder] = useState<DetailedOrderProps>()
    const [selected, setSelected] = useState<string>()
    const [orders, setOrders] = useState<OrderProps[]>([])
    async function getOrders() {
        try {
            api.get('orders')
                .then(res => setOrders(res.data))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getOrders()
    }, []);




    const getDetailedOrders = async () => {
        if (selected !== undefined) {
            try {
                const response = await api.get('/order/detail',
                    {
                        params: { order_id: selected }
                    }
                )
                setDetailedOrder(response.data[0])
                const productsInOrder = response.data?.map((order: DetailedOrderProps, i: number) => {
                    return {
                        name: order.Product.name,
                        amount: order.amount
                    }
                })
                setItems(productsInOrder)

            } catch (error) {
                console.log(error)
            }

        }
        else {
            return
        }
    }
    useEffect(() => {
        getDetailedOrders()
    }, [selected])

    console.log(detailedOrder)
    function openModal(id: string) {
        setSelected(id)
        setIsOpen(true)
    }
    return (
        <div className="w-screen h-screen max-w-full">
            <Header />
            {
                isOpen ?
                    detailedOrder ?
                        <div
                            className="w-full">
                            <div
                                className="w-full flex justify-end">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="fixed text-xl font-black px-3 py-3 text-white z-40">
                                    X
                                </button>
                            </div>
                            <Order
                                id={detailedOrder.Order.id}
                                address={detailedOrder.Order.adress as string}
                                cellphone={detailedOrder.Order.phone}
                                clientName={detailedOrder.Order.name}
                                paymentMethod={detailedOrder.Order.payment_method}
                                items={items as any}
                            />
                        </div>

                        : null
                    :
                    null
            }
            <h2 className="text-4xl py-5 font-bold w-full text-center text-red-500">Lista de Pedidos</h2>
            <div className="flex w-full h-3/5 flex-col items-center max-h-full overflow-y-scroll">

                <div className="w-[90%] flex flex-col gap-2 md:w-1/2 h-4/5">
                    {orders ? orders?.map((order, i) => {
                        return (
                            <div
                                className="w-full bg-red-400 h-12 text-xl font-bold text-white rounded-md flex px-5 items-center justify-between"

                                key={i}>
                                {order.name}
                                <button
                                    className="bg-white h-8 font-bold rounded-md text-lg px-2 text-red-400"
                                    onClick={() => openModal(order.id)}
                                >
                                    Mais informações
                                </button>

                            </div>
                        )
                    }) : "Ainda não existem pedidos"}
                </div>
            </div>
           <div className="w-full flex justify-center">
           <Link className="md:text-2xl h-10 flex items-center w-4/5 md:w-3/5 justify-center font-bold bg-zinc-400 text-white px-3 rounded-full hover:bg-zinc-500 hover:duration-500" href="/dashboard">
                Voltar para a pagina inicial
            </Link>
           </div>
        </div>
    )
}