"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import ProfileCardContent from "./profileCardContent";

const ProfileCard = () => {
  
  const { user, userProfile, isLoading } = useUserContext() as userContextType;

  if (isLoading) return <div className="info-heading">Loading...</div>;
  if (!user) return <div className="info-heading">Unauthorized Access!</div>;
  if (!userProfile)
    return <div className="info-heading">Loading Profile...</div>;

  return (
    <div className="w-full">
      <ProfileCardContent user={user} userProfile={userProfile} />
    </div>
  );
};

export default ProfileCard;