
import { FormEvent, useContext, useEffect, useState } from 'react'
import { Header } from '../components/header'
import { AiFillCheckCircle } from 'react-icons/ai'
import { api } from '../services/apiClient'
import { AuthContext } from '../contexts/AuthContext'
import  Router  from 'next/router'
import { toast } from 'react-toastify'
import { canSSRAuth } from '../utils/canSSRAuth'

export default function addPaymentMethod() {
    const [select, setSelect] = useState(1)
    const { orderDraft, setOrderDraft} = useContext(AuthContext)
    const [paymentMethod, setPaymentMethod] = useState<string>()
    function verifyPaymentMethod(){
        if(select === 1){
            return setPaymentMethod("dinheiro")
        }
        else if(select === 2) {
            return setPaymentMethod("cartão de crédito")
        }
        else if(select === 3) {
            return setPaymentMethod("cartão de débito")
        }
        else if(select === 4) {
            return setPaymentMethod("pix")
        }
    }
    useEffect(() => {
        verifyPaymentMethod()
    }, [select])
    const order_id = orderDraft?.id
    async function deleteOrderDraft(e: any) {
        e.preventDefault();

        try {
            await api.delete('/order', {
                params: { order_id: order_id }
            })
            alert('pedido cancelado')
            setOrderDraft(undefined)
            Router.push('/')
        } catch (error) {
            console.log(error)
        }
 
    }
    async function addPaymentMethod(e: FormEvent){
        e.preventDefault();
        try {
            await api.put('/order/add-payment-method', 
            {
                order_id,
                payment_method: paymentMethod
            })
            await api.put ('/order/send', {order_id})
            setOrderDraft(undefined)
            toast.success('Pedido finalizado!')
            Router.push('/myorder')
        } catch (error) {
            console.log(error)
        }
    
    }
    function verifyExistOrderDraft(){
        if(orderDraft){ 
            return
        }
        else return Router.push('/')
    }
    useEffect(() => {
        verifyExistOrderDraft()
    }, [orderDraft])
    return (
        <div className='w-screen h-screen'>
            <Header />
            <h2 className='w-full text-center text-3xl font-bold mb-8 text-red-700'>Selecione o método de pagamento desejado</h2>
            <div className='w-full flex flex-col items-center'>
                <div className='w-3/5 space-y-8'>
                    <div
                        onClick={() => setSelect(1)}
                        className={` ${select === 1 ? "bg-red-700" : "bg-red-300"} h-14 flex justify-center items-center text-2xl cursor-pointer rounded-md text-white font-semibold duration-500`}>
                        Dinheiro
                    </div>
                    <div
                        onClick={() => setSelect(2)}
                        className={` ${select === 2 ? "bg-red-700" : "bg-red-300"} h-14 flex justify-center items-center text-2xl cursor-pointer rounded-md text-white font-semibold duration-500`}>
                        Cartão de crédito
                    </div>
                    <div
                        onClick={() => setSelect(3)}
                        className={` ${select === 3 ? "bg-red-700" : "bg-red-300"} h-14 flex justify-center items-center text-2xl cursor-pointer rounded-md text-white font-semibold duration-500`}>
                        Cartão de débito
                    </div>
                    <div
                        onClick={() => setSelect(4)}
                        className={` ${select === 4 ? "bg-red-700 " : "bg-red-300"} h-14 flex justify-center items-center text-2xl cursor-pointer rounded-md text-white font-semibold duration-500`}>
                        Pix
                    </div>
                </div>
                <button 
                onClick={(e) => addPaymentMethod(e)}
                className=' bg-green-400 flex justify-center items-center gap-2 duration-500 mt-8 text-white font-semibold text-2xl hover:bg-green-500 px-10 p-3 rounded-full'>
                    Finalizar pedido
                    <AiFillCheckCircle/>
                </button>
                <button 
                onClick={(e) => deleteOrderDraft(e)}
                className=' bg-zinc-400 flex justify-center items-center gap-2 mt-8 duration-500 text-white font-semibold text-2xl hover:bg-zinc-500 px-10 p-3 rounded-full'>
                    Cancelar
                </button>
            </div>

        </div>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
      props: {}
    }
  })