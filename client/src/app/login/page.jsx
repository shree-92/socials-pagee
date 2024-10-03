"use client";

import Link from "next/link";
import { useState } from "react";

const Register = () => {
  const [username, setUseranme] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = (e) => {
    e.preventDefault();
    data = {username:username, password:password}    
  };
  return (
    <div className="text-lg text-white font-bold flex flex-col">
      <div>
        <form
          onSubmit={LoginUser}
          className="bg-gray-700 p-8  flex flex-col gap-y-5 rounded-lg shadow-lg shadow-gray-600"
        >
          <div className="flex flex-col gap-y-2">
            <label>username :</label>
            <input
              value={username}
              onChange={(e) => {
                setUseranme(e.target.value);
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

export default Register;
