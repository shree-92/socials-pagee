"use client"

import { useState } from "react";
import Link from "next/link";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="text-lg text-white font-bold">
      <form className="bg-gray-700 p-8  flex flex-col gap-y-5 rounded-lg shadow-lg shadow-gray-600">
        <div className="flex flex-col gap-y-2">
          <label>username :</label>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="px-3 rounded-lg text-md text-slate-700 font-sans "
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>email :</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="px-3 rounded-lg text-md text-slate-700 font-sans "
            type="text"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label>password :</label>
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="px-3 rounded-lg text-md text-slate-700 font-sans "
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
