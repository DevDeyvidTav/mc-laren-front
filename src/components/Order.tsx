import { CiLocationOn } from "react-icons/ci"
import { BsPersonFill, BsWhatsapp, BsCart } from "react-icons/bs"
import { MdOutlineAttachMoney } from "react-icons/md"
import { FormEvent, useState } from "react"
import { api } from "../services/apiClient"
import { toast } from "react-toastify"
interface OrderProps {
    clientName: string,
    address: string,
    cellphone: string,
    items: any[]
    comments?: string
    paymentMethod: string
    id: string
}



export function Order({ clientName, address, cellphone, items, paymentMethod, id }: OrderProps) {

    async function sendOrder(e: FormEvent){
        e.preventDefault()
        try {
            await api.put('order/finish', {order_id: id})
            alert("enviando pedido")
            window.location.reload()
        } catch (error) { 
            console.error(error)
        }
    }
    async function deleteOrder(e: any) {
        e.preventDefault();

        try {
            await api.delete('/order', {
                params: { order_id: id }
            })
            toast.success('pedido cancelado')
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        
        
    }
    return (
        <div className="w-full flex flex-col justify-center items-center gap-2 p-3 text-sm md:text-xl text-white h-4/5 fixed z-30 bg-[#CB474F] rounded-md mt-2 ">
            <div className="w-96 flex flex-col items-center">

                <p className="flex items-center gap-2"><BsPersonFill />Cliente: {clientName}</p>
                <p className="flex items-center gap-2"><CiLocationOn />Endereço: {address}</p>
                <p className="flex items-center gap-2"><BsWhatsapp className="w-4" />Telefone para contato: {cellphone}</p>
                <div>
                    <p className="flex w-full justify-center items-center gap-2">
                        <BsCart className="w-4" />Produtos:
                    </p>
                    {items?.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="flex gap-2">
                                <p>{i + 1}.</p>
                                <p>{item.name}.</p>
                                <p>| Quantidade: {item.amount}</p>

                            </div>
                        )
                    })}
                </div>
                <p className="flex items-center gap-2"><MdOutlineAttachMoney className="w-6" />Metodo de pagamento: {paymentMethod}</p>
                <button
                onClick={(e) => sendOrder(e)}
                    className="bg-green-400 w-full p-1 mt-4  rounded-md">
                    Concluir pedido!
                </button>
                <button
                onClick={deleteOrder}
                    className="bg-red-400 w-full p-1 mt-4  rounded-md">
                    excluir pedido
                </button>

            </div>

        </div>
    )
}