"use client";
import UserProfileForm from "@/components/forms/UserProfileForm";
import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";

const ProfilePage = () => {
  const { user, userProfile } = useUserContext() as userContextType;
  if (!user || !userProfile) return null;

  return (
    <main className="grow bg-mineral-green flex justify-center">
      <div className="w-[90%]">
        <div className="flex flex-col mb-10">
          <h1 className="subtitle">
            Profile Settings
          </h1>
          <h2 className="heading">Be Yourself</h2>
          <p className="subtitle-secondary">
            Show who you are to the other <span>Erranters</span>
          </p>
        </div>
        <div>
          <UserProfileForm
            initialValues={{
              name: userProfile.name,
              surname: userProfile.surname,
              username: userProfile.username,
              bio: userProfile.bio,
              interests: userProfile.interests,
              profile_image: userProfile.profile_image,
              headline: userProfile.headline,
              location: userProfile.location,
              cover_image: userProfile.cover_image,
            }}
            userId={user.id}
          />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;