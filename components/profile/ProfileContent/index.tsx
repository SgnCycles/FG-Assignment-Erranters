"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import UserProfileForm from "@/components/forms/UserProfileForm";

const UserProfileContent = () => {
  
  const { user, userProfile, isLoading } = useUserContext() as userContextType;

  if (isLoading) return <div className="info-heading">Loading...</div>;
  if (!user) return <div className="info-heading">Unauthorized Access!</div>
  if (!userProfile) return <div className="info-heading">Loading Profile...</div>

  return (
    <>
      <UserProfileForm userProfile={userProfile}/>
    </>
  );
};

export default UserProfileContent;