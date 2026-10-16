"use client";
import UserProfileForm from "@/components/forms/UserProfileForm";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";

const ProfilePage = () => {

  const { user, userProfile } = useUserContext() as userContextType;
  if (!user || !userProfile) return null;

  return (
    <main className="grow bg-mineral-green">
      <h1 className="heading">Edit Profile</h1>
      <UserProfileForm
        initialValues={{
          name: userProfile.name,
          surname: userProfile.surname,
          username: userProfile.username,
          bio: userProfile.bio,
          interests: userProfile.interests,
          profile_image: userProfile.profile_image,
          headline: userProfile.headline,
        }}
        userId={user.id}
      />
    </main>
  );
};

export default ProfilePage;