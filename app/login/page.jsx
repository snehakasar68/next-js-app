"use client"
import { Button, FormLabel, TextField } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
//  import { AuthContext } from "../Auth/AuthContext";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


const LoginPage=() => {
    // const {setUser}=useContext(AuthContext);
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const inputRef=useRef(null);
    const router = useRouter();
    const handleLogin=async()=>{
       const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError(res.error);
      return;
    } else {
          const url = res?.url ?? "/dashboard";
      router.push(url)
    }
     
    }
    useEffect(()=>{
      inputRef?.current?.focus()
    },[])
  return (
    <div className="flex h-[100vh] justify-center items-center " style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
        <div>
          <div>
          <FormLabel style={{display:"block"}}>Username</FormLabel>
          <TextField
          value={email} 
          inputRef={inputRef}
          className="input-field"
          onChange={((e)=>{
            setEmail(e.target.value)

          })}/>
          </div>
          <div>
           <FormLabel style={{display:"block"}}>Password</FormLabel>
          <TextField
           value={password} 
           type="password"
           className="input-field"
          onChange={((e)=>{
            setPassword(e.target.value)
          })}/>
          </div>
          <div className="flex justify-end cursor-pointer" onClick={()=>{
            router.push("/register")
          }}>
            Register
          </div>
          <Button onClick={handleLogin} variant="contained">Login</Button>
        </div>
    </div>
  );
};

export default LoginPage;