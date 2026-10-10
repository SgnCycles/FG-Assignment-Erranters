import GoBackButton from "@/components/buttons/GoBackButton";
import ErrorMessage from "@/components/ErrorMessage";
import MemberProfile from "@/components/MemberProfile";
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
      <MemberProfile
        userImage={data.profile_image}
        username={data.username}
        bio={data.bio}
        interests={data.interests}
        postData={postData}
      />
    </main>
  );
};

export default MemberProfilePage;