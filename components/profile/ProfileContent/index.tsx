"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import UserProfileForm from "@/components/forms/UserProfileForm";

const UserProfileContent = () => {
  
  const { user, userProfile } = useUserContext() as userContextType;
  if (!user || !userProfile) return null;

  return (
    <>
      <UserProfileForm userProfile={userProfile}/>
    </>
  );
};

export default UserProfileContent;