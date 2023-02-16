import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartComponent } from "../components/cart";
import { Header } from "../components/header";
import { OrderRequest } from "../components/order_request";
import { AuthContext } from "../contexts/AuthContext";
import { api } from "../services/apiClient";
import { canSSRAuth } from "../utils/canSSRAuth";

export default function Cart() {
    const [existsOrderDraft, setExistsOrderDraft] = useState<boolean>()
    const { user, orderDraft } = useContext(AuthContext)
    function verifyOrderDraft(){
        orderDraft ? setExistsOrderDraft(true) : setExistsOrderDraft(false);
    }
    useEffect(() => {
        verifyOrderDraft()
    }, [orderDraft])
    return (
        <div className="w-screen h-screen max-w-full">
            <Header />
            {
                existsOrderDraft ? < CartComponent /> :
                <OrderRequest />
            }
            
        </div>
    )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
      props: {}
    }
  })
  