"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import ProfileCardContent from "./profileCardContent";

const ProfileCard = () => {

  const { user, userProfile, isLoading } = useUserContext() as userContextType;

  if (isLoading) return <p className="info-heading">Loading...</p>;
  if (!user) return <p className="info-heading">Unauthorized Access!</p>;
  if (!userProfile) return <p className="info-heading">Loading Profile...</p>;

  return (
    <div className="w-full">
      <ProfileCardContent user={user} userProfile={userProfile} />
    </div>
  );
};

export default ProfileCard;