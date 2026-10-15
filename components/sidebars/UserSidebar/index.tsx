"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";

const UserSidebar = () => {
  
  const { userProfile } = useUserContext() as userContextType;
  return (
    <div className="w-[20%] bg-mineral-green">
      <div className="text-ecru-white font-semibold p-2 flex justify-end">
        <h2>Hi, {userProfile?.username}!</h2>
      </div>
    </div>
  );
};

export default UserSidebar;