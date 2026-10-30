"use client";
import { createClient } from "@/lib/supabase/browserClient";
import {
  getUserFavouritesNumber,
  getUserFollowerNumber,
  getUserPostNumber,
} from "@/lib/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import type { userContextType } from "@/types/types";

const ProfileCardContent = ({
  userProfile,
}: {
  userProfile: userContextType;
}) => {

  const supabase = createClient();
  const { data: postAmount, error } = useQuery({
    queryKey: ["user-post-count", userProfile.id],
    queryFn: () => getUserPostNumber(supabase, userProfile.id),
  });
  if (error) {
    console.log(error);
  }

  const { data: favouriteAmount, error: favouriteError } = useQuery({
    queryKey: ["user-favourite-count", userProfile.id],
    queryFn: () => getUserFavouritesNumber(supabase, userProfile.id),
  });

  if (favouriteError) {
    console.log(favouriteError);
  }

  const { data: followerAmount, error: followerError } = useQuery({
    queryKey: ["user-follower-count", userProfile.id],
    queryFn: () => getUserFollowerNumber(supabase, userProfile.id),
  });

  if (followerError) {
    console.error(followerError);
    return;
  }

   if(!userProfile) return null;

  const postCount = postAmount?.count ?? 0;
  const favouriteCount = favouriteAmount?.count ?? 0;
  const followerCount = followerAmount?.count ?? 0;

  return (
    <div className="bg-casual-white border-2 border-ecru-white h-100 w-full rounded-4xl">
      <div className="flex flex-col items-between h-full">
        {userProfile?.cover_image ? (
          <div className="h-25 relative rounded-tl-4xl rounded-tr-4xl">
            <img
              src={userProfile.cover_image}
              alt="profile user"
              className="h-full w-full object-cover rounded-tl-4xl rounded-tr-4xl"
            />
          </div>
        ) : (
          <div className="h-25 relative rounded-tl-4xl rounded-tr-4xl bg-gray-600"></div>
        )}
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
            <div className="h-25 w-25 rounded-full z-10 -translate-y-10 translate-x-5 border-4 border-ecru-white">
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
            <hr className="horizontal-rule px-4 mb-4"></hr>
          </div>
          <div className="flex justify-around h-1/3">
            <div className="profile-statistics">
              <p className="profile-statistics-number">{postCount}</p>
              <p className="profile-statistics-item">Posts</p>
            </div>
            <div className="profile-statistics">
              <p className="profile-statistics-number">{favouriteCount}</p>
              <p className="profile-statistics-item">Favourites</p>
            </div>
            <div className="profile-statistics">
              <p className="profile-statistics-number">{followerCount}</p>
              <p className="profile-statistics-item">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCardContent;