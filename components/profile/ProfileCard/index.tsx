"use client";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import ProfileCardContent from "./profileCardContent";

const ProfileCard = () => {
  const { user, userProfile } = useUserContext() as userContextType;
  if (!user) return;

  return <ProfileCardContent user={user} userProfile={userProfile} />;
};

export default ProfileCard;