"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import ProfileCardContent from "./profileCardContent";

const ProfileCard = () => {
  const { user, userProfile } = useUserContext() as userContextType;
  if (!user) return;

  return (
    <div className="w-full">
      <ProfileCardContent user={user} userProfile={userProfile} />
    </div>
  );
};

export default ProfileCard;