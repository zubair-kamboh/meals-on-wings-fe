import { useEffect, useState } from "react"
import { ItemsTile } from "../ItemsTile/ItemsTile";
import { CartTile } from "./CartTile/CartTile";
import './CartView.scss';
import { useNavigate } from "react-router-dom";

export const CartView=()=>{


    const navigate = useNavigate()
    const [total,setTotal] = useState(0);

    useEffect(() => {
        checkForCartChange()
    },[])

   const  checkForCartChange=()=>{
        let cart_total=0
        let all_items = localStorage.getItem("items")
        let json_obje=JSON.parse(all_items?all_items:"")
        let cart_data=json_obje
    
        for(let i=0;i<json_obje.length;i++){
           cart_total= cart_total+json_obje[i].totalPrice
        }
        setTotal(cart_total)
    }
    return(
<div>
{
  JSON.parse(localStorage.getItem("items") ?? '[]').map((item:any, index:number) => (
    <div key={index}>
            <CartTile index={index} values={item} />
    </div>
  ))
}

    
    <div className="category-main-heading text-end">Sub Total - {total} AUD</div>
    
    <div className="d-flex justify-content-end mt-3">
    <button className="checkout" onClick={()=>navigate('/checkout')}>Checkout</button>
    </div>
    </div>
    );
}