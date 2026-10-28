import UserProfileContent from "@/components/profile/ProfileContent";

const ProfilePage = () => {
  return (
    <main className="grow bg-mineral-green flex justify-center">
      <div className="w-[90%]">
        <div className="flex flex-col mb-4 lg:mb-10">
          <h1 className="subtitle">Profile Settings</h1>
          <h2 className="heading">Be Yourself</h2>
          <p className="subtitle-secondary">
            Show who you are to the other <span>Erranters</span>
          </p>
        </div>
        <div>
          <UserProfileContent />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;