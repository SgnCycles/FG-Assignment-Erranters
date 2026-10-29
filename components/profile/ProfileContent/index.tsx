"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import UserProfileForm from "@/components/forms/UserProfileForm";

const UserProfileContent = () => {
  
  const { user, userProfile, isLoading } = useUserContext() as userContextType;

  if (isLoading) return <p className="info-heading">Loading...</p>;
  if (!user) return <p className="info-heading">Unauthorized Access!</p>
  if (!userProfile) return <p className="info-heading">Loading Profile...</p>

  return (
    <>
      <UserProfileForm userProfile={userProfile}/>
    </>
  );
};

export default UserProfileContent;