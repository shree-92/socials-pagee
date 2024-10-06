"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";


const Register = () => {
  const [linkHandle, setLinkHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false)
  
  const router = useRouter()

  const RegisterUser = async (e) => {
    e.preventDefault();
    const data = { linkHandle, email, password };

    // ERROR HANDLING

    // for email
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      alert("Please enter a valid email address."); // Basic email validation
      return; // Stop further execution
    }
    //for links 
    if (data.linkHandle.trim() === "") {
      // Handle the error, e.g., show an alert or update state to display an error message
      alert("Link Handle cannot be empty."); // You can replace this with your own error handling logic
      return; // Stop further execution
    }
    // for password
    if (data.password.length < 6) {
      alert("Password must be at least 6 characters long."); // Basic password validation
      return; // Stop further execution
    }

    console.log(data);

    fetch("http://localhost:8080/api/v1/user/register", {
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then((response)=>{
      if(!response.ok) throw new Error("something went wrong with HTTP request");
      return response.json()
    })
    .then((data)=>{
      console.log("user registerd successfully", data);
      setFlag(true)
    })
    .catch(error=>console.log(error))

    // IF USERS REGISTERS LETS SENDIN HIM TO LOGIN PAGE
    
    
  };
  useEffect(()=>{
    if(flag){
      router.push("/login")
    ;}
  },[flag, router])
  

  return (
    <div className="text-lg text-white font-bold">
      <form
        onSubmit={RegisterUser}
        className="bg-gray-700 p-8  flex flex-col gap-y-5 rounded-lg shadow-lg shadow-gray-600"
      >
        <div className="flex flex-col gap-y-2">
          <label>LinkHandle :</label>
          <input
            value={linkHandle}
            placeholder="enter your link handle"
            onChange={(e) => {
              setLinkHandle(e.target.value);
            }}
            className="px-3 rounded-lg text-md text-slate-700 font-sans outline-none focus:ring-blue-700 focus:ring "
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>email :</label>
          <input
            placeholder="enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="px-3 rounded-lg text-md text-slate-700 font-sans outline-none focus:ring-blue-700 focus:ring "
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>password :</label>
          <input
            placeholder="enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="px-3 rounded-lg text-md text-slate-700 font-sans outline-none focus:ring-blue-700 focus:ring "
            type="text"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className="border border-slate-800  shadow-2xl shadow-gray-950 hover:shadow-gray-800 rounded-xl p-3 w-fit"
            type="submit"
          >
            {" "}
            Register
          </button>
        </div>
      </form>
      <div className="mt-4 flex justify-center items-center">
        Alredy have an account ?{" "}
        <Link href="login" className="text-pink-500 hover:text-pink-700">
          Click Here
        </Link>
      </div>
    </div>
  );
};

export default Register;
