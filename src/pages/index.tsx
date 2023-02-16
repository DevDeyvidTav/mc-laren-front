import { CgChevronDoubleRightO, CgChevronDoubleLeftO } from "react-icons/cg"
import React, { useContext, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { AiOutlineShoppingCart, AiOutlineLogout } from "react-icons/ai"

import { BsFillCartCheckFill, BsCart } from "react-icons/bs"
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { AuthContext } from "../contexts/AuthContext";
import { canSSRAuth } from "../utils/canSSRAuth";
import Link from "next/link";

import { MdDeliveryDining } from "react-icons/md"

export default function Home() {
  const { user, signOut } = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  return (
    <div className="w-screen max-w-full flex">
      <div className={`${open ? "w-96 " : "w-12 "} h-screen fixed z-30 duration-500 border-r border-white bg-red-400 flex flex-col `}>
        <div className={`${open ? "justify-between " : "justify-end"} flex pr-2 w-full`}>
          <img src="/logo.jpg" width={100} className={`${open ? "" : "hidden"} ml-3 w-20  rounded-full`} height={100} />
          <p className="mt-7  text-xl text-white">{open ? `Bem vindo(a) ${user?.name.toUpperCase()}` : ""}</p>
          <CgChevronDoubleRightO
            onClick={() => setOpen(!open)}
            className={`${open ? "rotate-180" : ""} text-red-600 cursor-pointer rounded-full duration-1000 bg-white mt-7 w-7 h-7`} />
        </div>
        <ul className={`${open ? "flex flex-col" : "hidden"} gap-2 pl-3 mt-10 text-white text-xl font-semibold`}>
          <li className="flex items-center cursor-pointer gap-1"><BsCart className="w-4" /> <Link href="/cart">Faça um pedido</Link></li>
          <li className="flex items-center cursor-pointer gap-1"><BsFillCartCheckFill className="w-4" /> <Link href="/myorder">Veja seus pedidos</Link>  </li>
          <li onClick={() => signOut()} className="flex cursor-pointer items-center gap-1"><AiOutlineLogout className="w-4" /> Encerrar Sessão  </li>
        </ul>

      </div>

      <div className="ml-12 w-[88%] h-full">
        <h2 className="md:text-4xl text-4xl text-green-700 font-black ml-5 mt-3">Conheça nossas opções e monte o seu lanche !</h2>
        <div className="flex flex-col md:justify-center md:flex-row w-full md:mt-20 gap-2 pl-2">
          <div className="w-[19rem] lg:w-[16%] md:mr-32 md:w-2/5  mt-10 md:mx-0 mx-auto md:h-[16rem] h-72 relative flex justify-center items-center  max-w-full rounded-full shadow-2xl">
            <img className="w-4/5 lg:w-4/5 lg:h-5/6  md:w-4/5 absolute z-20 h-4/5 md:h-4/5 " src="/pizza.png" alt="" />
          </div>
           <div className="flex items-center mt-10 md:gap-32 gap-2 mb-10">
              <img className="w-3/5 md:w-72  z-20 h-32 mx-auto " src="/beirute.png" alt="" />
              <img className="w-3/5  z-20 h-56 mx-auto " src="/coca-cola.png" alt="" />
           </div>
        </div>
        <div className="ml-2 md:w-72  md:mx-auto  mt-3 flex flex-col w-full h-[90%]">
          <p className="text-2xl  text-green-900 flex items-center gap-1 font-extrabold"><MdDeliveryDining />Entrega gratuita</p>

          <h2 className="text-2xl md:text-4xl text-green-900  font-extrabold mt-3">Categorias:</h2>
          <div className="text-xl md:text-2xl font-bold text-red-700">
            <h3>.Pizzas</h3>
            <h3>.Beirutes</h3>
            <h3>.Bebidas</h3>
            <div className="flex gap-2 flex-wrap">

            </div>
          </div>
        <div>

          </div>
          <Link className="w-[60%] md:w-72 h-12 mx-auto bg-red-600 hover:bg-red-700 hover:duration-500 rounded-full mt-5 mb-5 text-white flex justify-center items-center" href="/cart">Faça já o seu pedido</Link>
        </div>
      </div>
    </div>
  )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})