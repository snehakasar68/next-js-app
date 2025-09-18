"use client" //because we use useeffect and useState that why we need to add this
import { useEffect, useState } from "react"
type Product = {
  id: string;
  title: string;
};
const Contact:React.FC=()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch("https://fakestoreapi.com/products").then((res)=>res.json()).then(setData)
    },[])
    return (
        <div className="container">
            <h1>This is contact page</h1>
            {
                data?.map((item:Product)=>{
                    return(
                        <p key={item?.id}>{item?.title}</p>
                    )
                })
            }
        </div>
    )
}
export default Contact