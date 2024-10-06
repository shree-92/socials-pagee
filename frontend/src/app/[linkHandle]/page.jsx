"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const Profile = ({ params }) => {
  const linkHandle = params.linkHandle;
  

  const [userDetails, setUserDeatails] = useState("")
  const [flag , setFlag] =useState(false)

  useEffect(() => {
    const PreviewUserDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/user/username",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ linkHandle: linkHandle }),
          }
        );
        if (!response.ok) {
            setFlag(true)
          console.log("something went wrong while fetching");
        }

        const data = await response.json()
        setUserDeatails(data)

        console.log(data);
        
      } catch (error) {
        console.log(error);
      }
    };

    PreviewUserDetails();
  }, [linkHandle]);
  return (
    <div>
        {
            (flag == true) ? <div>404 link doesnt exist </div> :(
              <div>
                <div>name : {userDetails.name}</div>
                <div>email : {userDetails.email}</div>
                <div></div>
              </div>
            )
        }
    </div>
  )
}

export default Profile