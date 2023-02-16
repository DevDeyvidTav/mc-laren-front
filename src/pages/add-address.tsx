import { FormEvent, useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import Router from "next/router"
import { Header } from "../components/header"
import { api } from "../services/apiClient"
import { canSSRAuth } from "../utils/canSSRAuth"

export default function addAdress() {
    const [neighborhood, setNeighborhood] = useState<string>()
    const [road, setRoad] = useState<string>()
    const [complement, setComplement] = useState<string>()
    const [number, setNumber] = useState<string>()
    const [address, setAddress] = useState<string>()
    const { orderDraft, setOrderDraft } = useContext(AuthContext)
    const totalPrice = orderDraft?.total_price
    const order_id = orderDraft?.id
    console.log(address)
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
    async function addAddress(e: FormEvent) {
        e.preventDefault();
      
        try {
          const addressText = `Bairro: ${neighborhood}, Rua: ${road}, número: ${number}, Ponto de referência: ${complement}`;
          setAddress(addressText);
      
          await api.put('/order/add-address', {
            order_id,
            address: addressText
          });
      
          Router.push('/add-payment-method');
        } catch (error) {
          console.error(error);
        }
      }
    return (
        <div className="w-screen h-screen max-w-full">
            <Header />
            <form
                onSubmit={(e) => addAddress(e)}
                className="w-full flex flex-col items-center h-4/5">
                <h2 className="text-red-600 mt-5 font-bold text-4xl">Adicione seu Endereço</h2>
                <div className="w-[90%] mt-5 space-y-5">
                    <input 
                        required
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="Bairro"
                        type="text"
                        className="border w-full px-3 placeholder:text-xl placeholder:text-red-400  h-10 rounded-md border-red-500" />
                    <div
                        className="w-full">
                        <input
                            required
                            value={road}
                            onChange={(e) => setRoad(e.target.value)}
                            placeholder="Rua"
                            type="address" 
                            className="border w-[70%] px-3 placeholder:text-xl placeholder:text-red-400 rounded-md h-10 border-red-500" />
                        <input 
                            required
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="Número"
                            type="number"
                            className="border px-3 placeholder:text-xl placeholder:text-red-400 w-[28%] rounded-md h-10 ml-[2%] border-red-500" />
                    </div>
                    <input 
                        required
                        type="text" 
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        placeholder="Digite um ponto de referência para facilitar a entrega"
                        className="border px-3 placeholder:text-xl placeholder:text-red-400 w-full rounded-md h-20 border-red-500" />
                    <p
                        className="w-full text-center text-red-600">
                        Lembrando que só entregamos em São Paulo
                    </p>
                </div>
                <button className=" bg-green-400 mt-8 text-white font-semibold text-xl hover:bg-green-500 px-10 p-1 rounded">
                    Avançar
                </button>
                <p 
                onClick={(e) => deleteOrderDraft(e)}
                className=" bg-red-400 mt-8 cursor-pointer text-white font-semibold text-xl hover:bg-red-500 px-10 p-1 rounded">
                    cancelar
                </p>
            </form>
            
        </div>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
      props: {}
    }
  })