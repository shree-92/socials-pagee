"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] =useState(false)

  const router = useRouter()



  const LoginUser = (e) => {
    e.preventDefault();
    const data = { email, password };

    console.log(data);

    fetch("http://localhost:8080/api/v1/user/login", {
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
      console.log("user logged in successfully", data);
      setFlag(true)
    })
    .catch(error=>console.log(error))

  };
    
    // IF USERS LOGGS IN LETS SENDIN HIM TO PROFILE PAGE
    useEffect(()=>{
      if(flag){
      router.push("/profile")
    ;}
  },[flag, router])


  return (
    <div className="text-lg text-white font-bold flex flex-col">
      <div>
        <form
          onSubmit={LoginUser}
          className="bg-gray-700 p-8  flex flex-col gap-y-5 rounded-lg shadow-lg shadow-gray-600"
        >
          <div className="flex flex-col gap-y-2">
            <label>email :</label>
            <input
            placeholder="email"
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
            placeholder="password"
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
              LOG IN
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4 flex justify-center items-center">
        <Link href="register" className="text-pink-500  hover:text-pink-700">
          Click Here to register
        </Link>
      </div>
    </div>
  );
};
  
export default Login;
