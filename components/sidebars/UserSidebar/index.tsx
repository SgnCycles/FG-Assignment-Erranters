"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";

const UserSidebar = () => {

  const { userProfile } = useUserContext() as userContextType;

  return (
    <div className="w-[10%] bg-mineral-green">
      <h2>User sidebar</h2>
      <div className="text-ecru-white font-semibold p-2 flex justify-end">
        Hi, {userProfile?.username}!
      </div>
    </div>
  );
};

export default UserSidebar;