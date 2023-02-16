import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Header } from "../components/header";
import { AuthContext, ProductProps } from "../contexts/AuthContext";
import { api } from "../services/apiClient";
import { AiFillDelete } from "react-icons/ai"
import { useVerifyAdmin } from "../hooks/useVerifyAdmin";

export default function myproducts(){


    const [products, setProducts] = useState<ProductProps[]>()
    async function getProducts(){
        try {
            const res = await api.get('/product')
            setProducts(res.data)
        } catch (error) {
            console.error(error)
        }
    }
    async function deleteProducts(product_id: string){
        try {
            await api.delete('/product', {
                params: { product_id: product_id}
            })
            getProducts()
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(()=> {
        getProducts()
    }, [])
    return (
        <div className="w-screen flex items-center flex-col h-screen max-w-full">
            <Header/>
            <h2 className="w-full text-center text-4xl font-bold text-red-500 py-5">Meus Produtos</h2>
            
            <div 
            className="w-full flex flex-col space-y-2 mb-2 items-center">
                {products ? products.map((product, i) => {
                    return (
                        <div 
                        key={i}
                        className="grid grid-cols-3 h-16 text-white font-bold rounded-md items-center pl-5  w-4/5 bg-red-400">
                            <p className="text-sm font-thin flex justify-center items-center">Nome: {product.name}</p>
                            <p className=" flex justify-center">preço: R${product.price}</p>
                            <button 
                            onClick={() => deleteProducts(product.id)}
                            className=" flex justify-center"><AiFillDelete/> </button>
                        </div>
                    )
                })
            :
            <div className="hidden"></div>
            }
            </div>
            
            <Link 
            className="px-2 mt-6 rounded-full flex w-72 h-12 items-center justify-center bg-green-400 text-white text-xl font-bold hover:bg-green-500 hover:duration-500 "
            href="/product">
                + cadastrar novo produto 
            </Link>
            <Link 
            className="px-2 mt-2 rounded-full flex w-72 h-12 items-center justify-center bg-zinc-400 text-white text-xl font-bold hover:bg-zinc-500 hover:duration-500 "
            href="/dashboard">
                voltar
            </Link>
        </div>
    )
}