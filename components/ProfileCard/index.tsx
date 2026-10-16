import { useUserContext } from "@/context/userContext";
import type { userContextType } from "@/types/types";
import Link from "next/link";

const ProfileCard = () => {
  const { userProfile } = useUserContext() as userContextType;

  return (
    <div className="bg-ecru-white border-2 border-ecru-white h-100 w-full mr-6 mt-6 rounded-4xl">
      <div className="h-full flex flex-col">
        <div className="h-1/4">
          <img
            className="rounded-tl-4xl rounded-tr-4xl h-full w-full object-cover"
            src="/images/erranters_cycling.png"
            alt=""
          />
        </div>
        <div className="flex justify-between h-15">
          {userProfile?.profile_image ? (
            <div className="h-25 w-25 rounded-full z-10 -translate-y-10 translate-x-5 border-4 border-ecru-white">
              <img
                src={userProfile.profile_image}
                alt="profile user"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="h-25 w-25 rounded-full">
              <img
                src="/images/profileImage_placeholder.png"
                alt="user placeholder"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          )}
          <div className="mt-2 mr-4">
            <Link
              href="/profile"
              className="text-outer-space font-bold text-xs cursor-pointer hover:text-apple"
            >
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="grow flex flex-col">
          <div className="ml-4">
            <h2 className="font-bebas-neue text-base">
              @{userProfile?.username}
            </h2>
            <p>{userProfile?.headline}</p>
          </div>
          <div className="mt-auto">
            <hr className="w-full border-outer-space/50 border-t-[0.5px] px-4 mb-4"></hr>
          </div>
          <div className="flex justify-around h-1/3">
            <div className="profile-statistics">
              <p className="profile-statistics-number">123</p>
              <p className="profile-statistics-item">Posts</p>
            </div>
            <div className="profile-statistics">
              <p className="profile-statistics-number">123</p>
              <p className="profile-statistics-item">Saved</p>
            </div>
            <div className="profile-statistics">
              <p className="profile-statistics-number">123</p>
              <p className="profile-statistics-item">Favourites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
