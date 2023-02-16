import { async } from "@firebase/util";
import Link from "next/link";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext, OrderDraftProps, ProductProps } from "../contexts/AuthContext";
import { api } from "../services/apiClient";
import { AiFillDelete } from "react-icons/ai"
import Router from "next/router";
import { toast } from "react-toastify";

interface OrderItemsProps {
    Order: OrderDraftProps
    Product: ProductProps
    amount: number
    create_at: string
    id: string
    orderId: string
    productId: string
    updated_at: string
}

export function CartComponent() {

    const { user, orderDraft } = useContext(AuthContext)
    const order_id = orderDraft?.id
    const [orderItems, setOrderItems] = useState<OrderItemsProps[] | undefined>()
    async function deleteOrderDraft(e: any) {
        e.preventDefault();

        try {
            await api.delete('/order', {
                params: { order_id: order_id }
            })
        } catch (error) {
            console.log(error)
        }
        toast.success('pedido cancelado')
        window.location.reload()
    }
    async function getOrderItems() {
        try {
            await api.get('/order/detail', {
                params: { order_id: order_id }
            }).then(response => setOrderItems(response.data))
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        getOrderItems()
    }, [])
    console.log(orderItems)
    async function removeItem(id: string, e: FormEvent) {
        try {
            await api.delete('/order/remove', {
                params: {
                    item_id: id
                }
            })
            toast.success('item removido')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    const pricesArray = orderItems?.map(item => Number(item.Product.price) * item.amount);

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setTotalPrice(
            pricesArray ? pricesArray.reduce((acc, price) => acc + price, 0) : 0
        );
    }, [pricesArray]);
    async function addTotalPrice(e: FormEvent) {
        e.preventDefault();
      
        try {
           await api.put('/order/add-total-price', {
            order_id,
            price: totalPrice
          });
          Router.push('/add-address')
        } catch (error) {
          console.error(error);
        }
      }
      

    return (
        <div className="w-full h-4/5">
            <div className="bg-red-100 border border-red-500 w-[95%] mx-auto rounded-md h-1/2 mt-8">
                <p className="w-full text-center text-2xl h-[10%] text-red-500 font-bold">Carrinho:</p>
                <div className="flex flex-col h-full items-between">
                    <div className="w-full h-[90%] mt-2 flex flex-col items-center overflow-y-scroll">
                        {orderItems === undefined || orderItems.length === 0 ?
                            <p>adicione algum item no carrinho</p> :
                            orderItems?.map((item, i) => {
                                return (
                                    <div className="flex bg-red-400 border border-white text-white text-lg px-2 w-full justify-between">
                                        <p>
                                            Nome: {item.Product.name}
                                        </p>
                                        <p>
                                            Preço: R${item.Product.price}
                                        </p>
                                        <p>
                                            Qtd: {item.amount}
                                        </p>
                                        <button
                                            onClick={(e) => removeItem(item.id, e)}
                                        >
                                            <AiFillDelete />
                                        </button>
                                    </div>
                                )
                            })
                        }
                    <p className={`${totalPrice === 0 ? "hidden" : "" } w-full h-6 text-white text-lg flex items-center justify-center bg-green-500 text-center`}>{totalPrice === 0 ? "" : `Valor total R$${totalPrice}`}</p>
                    </div>

                </div>
            </div>
            <div className=" w-full h-[26.2%]">
                <div className="flex flex-col w-full items-center gap-1">
                    <Link href="/makeorder">
                        <button className="bg-green-400 mt-8 text-white font-semibold text-xl hover:bg-green-500 px-10 p-1 rounded">
                            adicionar itens
                        </button>
                    </Link>
                    <button
                        onClick={(e) => deleteOrderDraft(e)}
                        className="bg-red-400 mt-3 text-white font-semibold text-xl hover:bg-red-500 px-10 p-1 rounded">
                        cancelar pedido
                    </button>
                    <Link href="/">
                        <button className="text-red-500 underline font-semibold text-xl p-1 rounded">
                            Voltar para página inicial
                        </button>
                    </Link>
                    <button 
                    onClick={(e) => addTotalPrice(e)}
                    className={`${totalPrice === 0 ? "pointer-events-none cursor-not-allowed bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" : "" } bg-green-400 mt-8 text-white font-semibold text-xl hover:bg-green-500 px-10 p-1 rounded`}>
                        Avançar
                    </button>
                </div>
            </div>
        </div>
    )
}