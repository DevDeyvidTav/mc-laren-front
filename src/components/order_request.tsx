import Link from "next/link";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/apiClient";

export function OrderRequest() {
    const { user } = useContext(AuthContext)
    const user_id = user?.id
    const [name, setName] = useState<string>()
    const [phone, setPhone] = useState<string>()
    const [confirmOrder, setConfirmOrder] = useState(false)


    const handleChange = (event: any) => {
        const enteredValue = event.target.value;
        const formattedValue = enteredValue
            .replace(/\D/g, '')
            .substring(0, 11)
            .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        setPhone(formattedValue);

    };
    const createOrder = async (e: FormEvent) => {
        e.preventDefault()
        if (phone?.length === 15) {
            try {
                await api.post("/order",
                    {
                        name,
                        phone,
                        user_id
                    })
                window.location.reload()
            } catch (error) {
                console.log(error)
            }


        } else {
            alert("digite o seu numero de acordo com padrão")
        }

    }
    return (
        <div className="w-full h-[75%]">
            {
                confirmOrder ?
                    <div className="w-full flex flex-col items-center">
                        <form
                            onSubmit={e => createOrder(e)}
                            className="flex text-xl text-red-500 gap-2 flex-col w-full h-full items-center pt-10 ">
                            <p>Digite o seu nome:</p>
                            <input
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                type="text"
                                className="border border-red-500 px-3 w-1/2 h-10 rounded" />
                            <p>Digite o seu número de telefone:</p>
                            <input
                                type="tel"
                                value={phone}
                                onChange={e => handleChange(e)}
                                required
                                className="border border-red-500 px-3 w-1/2 h-10 rounded" />

                            <button
                                className="bg-green-400 hover:bg-green-500 p-1 px-6 rounded-md hover:duration-500 text-white text-xl mt-4 ">
                                Avançar
                            </button>

                        </form>
                        <Link className="mt-2" href="/">
                            <button
                                className="bg-red-400 hover:bg-red-500 w-32 h-9 rounded-md hover:duration-500 text-white text-xl  ">
                                cancelar
                            </button>
                        </Link>
                    </div>
                    :
                    <div className="pl-10 pt-10 text-xl ">
                        <p className="mb-5 text-2xl">Você deseja fazer um pedido?</p>
                        <button
                            onClick={(e) => setConfirmOrder(true)}
                            className="bg-green-400 hover:bg-green-500 hover:duration-500 p-1 px-6 rounded-md text-white">
                            Sim
                        </button>
                        <Link href="/">
                            <button className="bg-red-400 ml-2 hover:bg-red-500 hover:duration-500 p-1 px-6 rounded-md text-white">Não</button>
                        </Link>
                    </div>

            }
        </div>
    )
}