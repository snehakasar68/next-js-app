"use client"
import { Button, FormLabel, TextField } from "@mui/material";
import { use, useContext, useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const Register=() => {
    const [user,setUser]=useState({ firstName:"", lastName:"", email:"", password:"" })
   
    const [error,setError]=useState("");
    const inputRef=useRef<HTMLElement | null>(null);
    const router = useRouter();
    
    const handleRegister=async()=>{
     const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...user}),
    });
    if(res.ok){
      alert("Registration Successful")
      setUser({ firstName:"", lastName:"", email:"", password:"" })
      router.push("/login")
    }
  }
    useEffect(()=>{
      inputRef?.current?.focus()
    },[])
  return (
    <div className="flex h-[100vh] justify-center items-center " style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
        <div>
          <div className="flex gap-3">
            <div>
          <FormLabel className="block">First Name</FormLabel>
          <TextField
          value={user.firstName} 
          inputRef={inputRef}
           className="input-field"
          onChange={((e)=>{
            setUser({...user,firstName:e.target.value})
          })}/>
          </div>
          <div>
          <FormLabel style={{display:"block"}}>Last Name</FormLabel>
          <TextField
          value={user.lastName} 
           className="input-field"
          onChange={((e)=>{
            setUser({...user,lastName:e.target.value})
          })}/>
          </div>
          </div>
          <div className="flex gap-3">
          <div>
          <FormLabel style={{display:"block"}}>Email</FormLabel>
          <TextField
          value={user.email} 
           className="input-field"
          onChange={((e)=>{
            setUser({...user,email:e.target.value})
          })}/>
          </div>
          <div>
           <FormLabel style={{display:"block"}}>Password</FormLabel>
          <TextField
           value={user.password} 
           type="password"
           className="input-field"
          onChange={((e)=>{
            setUser({...user,password:e.target.value})
          })}/>
          </div>
         </div>
          <Button onClick={handleRegister} variant="contained">Register</Button>
        </div>
    </div>
  );
};

export default Register;