"use client"

import { useEffect, useState } from "react"

const ProductsPage=()=>{
   
    const [products,setProducts]=useState({name:"",desc:"",qty:0});
    const handleSubmit=async() =>{
        console.log("sdfh",products)
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ...products, qty: Number(products.qty) }),
});
    const data = await res.json();
setProducts({name:"",desc:"",qty:0})  }
    
return (
    <div className="container">
       <div>
        <label>
            Product Name:
        </label>
        <input type="text" className="border-1" value={products.name} onChange={(e)=>{setProducts({...products,name:e.currentTarget.value})}}/>
       </div>
        <div>
        <label>
            Product Description:
        </label>
        <input type="text" className="border-1" value={products.desc}
        onChange={(e)=>setProducts({...products,desc:e.currentTarget.value})}/>
       </div>
        <div>
        <label>
            Quantity:
        </label>
        <input type="text" className="border-1" value={products.qty}
        onChange={(e)=>{setProducts({...products,qty: Number(e.currentTarget.value) })}}/>
       </div>
       <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
)
}
export default ProductsPage
;