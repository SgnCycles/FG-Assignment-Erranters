"use client";
import { useQuery } from "@tanstack/react-query";
import { MemberProfilePropsType } from "./types";
import {
  getUserFavouritesNumber,
  getUserPostNumber,
} from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/browserClient";

const MemberProfile = ({ profile }: MemberProfilePropsType) => {

  const supabase = createClient();
  const { data: postAmount, error } = useQuery({
    queryKey: ["user-post-count", profile.id],
    queryFn: () => getUserPostNumber(supabase, profile.id),
  });
  if (error) {
    console.log(error);
  }

  const { data: favouriteAmount, error: favouriteError } = useQuery({
    queryKey: ["user-favourite-count", profile.id],
    queryFn: () => getUserFavouritesNumber(supabase, profile.id),
  });
  if (favouriteError) {
    console.log(favouriteError);
  }

  const postCount = postAmount?.count ?? 0;
  const favouriteCount = favouriteAmount?.count ?? 0;

  return (
    <div className="h-full flex flex-col items-center mt-10">
      <div className="flex flex-col w-[80%] bg-casual-white rounded-4xl border-2">
        <div className="rounded-tl-4xl rounded-tr-4xl">
          {profile.cover_image ? (
            <div className="h-50 relative rounded-tl-4xl rounded-tr-4xl">
              <img
                src={profile.cover_image}
                alt="profile user"
                className="h-full w-full object-cover rounded-tl-4xl rounded-tr-4xl"
              />
            </div>
          ) : (
            <div className="h-50 relative rounded-tl-4xl rounded-tr-4xl bg-gray-600"></div>
          )}
        </div>
        <div className="flex justify-between h-15">
          {profile.profile_image ? (
            <div className="h-40 w-40 rounded-full z-10 -translate-y-1/2 translate-x-15 border-4 border-ecru-white">
              <img
                src={profile.profile_image}
                alt="profile user"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="h-40 w-40 rounded-full">
              <img
                src="/images/profileImage_placeholder.png"
                alt="user placeholder"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          )}
          <div className="flex mt-4 gap-4 mr-4">
            <button className="button-light-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail preview-icon"
              >
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                <rect x="2" y="4" width="20" height="16" rx="2" />
              </svg>
              <span className="ml-2">Message</span>
            </button>
            <button className="button-dark-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-round-plus preview-icon"
              >
                <path d="M2 21a8 8 0 0 1 13.292-6" />
                <circle cx="10" cy="8" r="5" />
                <path d="M19 16v6" />
                <path d="M22 19h-6" />
              </svg>
              <span className="ml-2">Follow</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col grow items-center mt-6">
          <div className="w-full px-10">
            <div className="flex flex-col mt-4">
              <h1 className="member-heading">
                <span>{profile.name}</span> <span>{profile.surname}</span>
              </h1>
            </div>
            <div className="flex text-outer-space/50">
              <p>@{profile.username}</p>
              <p>/</p>
              <p>{profile.headline}</p>
            </div>
            <div className="flex flex-col text-outer-space mt-2">
              <p>{profile.bio}</p>
            </div>
            <div className="flex text-outer-space mt-2">
              <h2 className="mr-1 font-semibold text-outer-space/70">
                Interests:
              </h2>
              <p>{profile.interests}</p>
            </div>
            <div className="flex justify-between text-outer-space/50">
              <div className="flex items-center gap-4">
                {profile.location && profile.country && (
                  <p>
                    {profile.location}, {profile.country}
                  </p>
                )}
                <p className="">
                  Joined{" "}
                  <span className="ml-1">
                    {" "}
                    {new Date(profile.created_at).toLocaleString("sv-Se", {
                      dateStyle: "short",
                    })}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 h-1/3 my-4 mx-2">
                <div className="profile-statistics">
                  <p className="profile-statistics-number">{postCount}</p>
                  <p className="profile-statistics-item">Posts</p>
                </div>
                <div className="profile-statistics">
                  <p className="profile-statistics-number">{favouriteCount}</p>
                  <p className="profile-statistics-item">Favourites</p>
                </div>
                <div className="profile-statistics">
                  <p className="profile-statistics-number">123</p>
                  <p className="profile-statistics-item">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;