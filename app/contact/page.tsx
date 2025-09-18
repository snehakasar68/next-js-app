"use client" //because we use useeffect and useState that why we need to add this
import { useEffect, useState } from "react"

const Contact:React.FC=()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch("https://fakestoreapi.com/products").then((res)=>res.json()).then(setData)
    })
    return (
        <div className="container">
            <h1>This is contact page</h1>
            {
                data?.map((item:any)=>{
                    return(
                        <p key={item?.id}>{item?.title}</p>
                    )
                })
            }
        </div>
    )
}
export default Contact