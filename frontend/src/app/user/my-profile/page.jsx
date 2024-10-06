"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter()
  const [userDetails, setUserDetails] = useState("");

  
  const [linkHandle, setLinkHandle] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [flag, setFlag] = useState(false);
  
  console.log(name, email, linkHandle);
  
  const SubmitChanges = async (e) => {
    e.preventDefault();
    const data = { linkHandle, email, name };
    
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
    
    console.log(data);
    
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/user/profile",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );      
      if (!response.ok) {
        log(response);
      }

      setFlag(true)
    } catch (error) {
      console.log(error);
    }
    
      router.push(`/${linkHandle}`)
    


  };
  
  return (
    <div className="text-lg">
      <form
        onSubmit={SubmitChanges}
        className="min-h-screen flex flex-col gap-y-4 justify-center items-center"
      >
        <span className="text-2xl">EDIT PAGE</span>
        <div className="flex flex-col gap-2">
          <label>Name :</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-lg outline-none focus:ring-2 ring-blue-700 text-black font-bold "
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Email :</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-lg outline-none focus:ring-2 ring-blue-700 text-black font-bold "
            type="text"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>URL name :</label>
          <input
            value={linkHandle}
            onChange={(e) => setLinkHandle(e.target.value)}
            className="p-2 rounded-lg outline-none focus:ring-2 ring-blue-700 text-black font-bold "
            type="text"
          />
        </div>

        <div className="bg-red-400 p-4 rounded-full  hover:bg-red-500">
          <button type="submit">Edit Details</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
