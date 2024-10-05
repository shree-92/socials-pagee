"use client";

import { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/v1/user/profile", {
          method: "GET",
          credentials:"include",
        
        });

        if (!response.ok) {
          console.log("something went wrong while fetching user profile");
          return;
        }

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("fetching user profile error", error);
      }
    };
    fetchProfile()
  }, []);

  return (
    <div className="text-lg text-white font-bold">
      <div className="flex flex-col">
        <div>user details here</div>
        <div>name</div>
        <div>linkHandle</div>
        <div>email</div>
        <div>links</div>
      </div>
    </div>
  );
};

export default Profile;
