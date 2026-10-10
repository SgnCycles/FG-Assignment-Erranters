import GoBackButton from "@/components/buttons/GoBackButton";
import ErrorMessage from "@/components/ErrorMessage";
import ShortPost from "@/components/posts/ShortPost";
import { getMemberProfile, getUserPosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const MemberProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const { username } = await params;
  const supabase = await createClient();
  const { data, error } = await getMemberProfile(username);

  if (error) {
    return <ErrorMessage error={error.message} />;
  }

  if (!data) return <ErrorMessage error="User Not Found" />;

  const userId = data.id;

  const { data: postData, error: postError } = await getUserPosts(
    supabase,
    userId,
  );

  if (postError) {
    return <ErrorMessage error={postError.message} />;
  }

  return (
    <main className="flex flex-col grow bg-mineral-green text-ecru-white w-full font-cantarell">
      <div className="w-full pl-4">
        <GoBackButton />
      </div>
      <div className="min-h-screen flex">
        <div className="flex mx-4">
          <div className="flex flex-col justify-start sticky top-0 self-start">
            <div className="place-items-center m-4">
              <div className="h-40 w-40">
                <img
                  src={data.profile_image ?? undefined}
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </div>
            <h1 className="profile-heading">{data.username}</h1>
            <div className="flex justify-start items-start gap-4">
              <button className="flex button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
              <button className="flex button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
        </div>
        <div className="flex flex-col grow">
          <div className="flex flex-col m-4">
            <h2 className="heading-h2">Bio:</h2>
            <p>{data.bio}</p>
          </div>
          <div className="flex flex-col m-4">
            <h2 className="heading-h2">Interests:</h2>
            <p>{data.interests}</p>
          </div>
          <div className="flex flex-col">
            <h2 className="heading-h2 mx-4">Posts:</h2>
            {postData &&
              postData.map((post, index) => (
                <ShortPost
                  key={index}
                  {...post}
                  username={post.author.username}
                  userImage={post.author.profile_image}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MemberProfilePage;