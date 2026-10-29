import { getMemberProfile } from "@/lib/supabase/queries";
import GoBackButton from "@/components/buttons/GoBackButton";
import ErrorMessage from "@/components/ErrorMessage";
import MemberPosts from "@/components/posts/MemberPosts";
import MemberProfile from "@/components/profile/MemberProfile";

const MemberProfilePage = async ({
  params,
}: {
  params: { username: string };
}) => {
  
  const { username } = await params;
  const { data, error } = await getMemberProfile(username);

  if (error) {
    return <ErrorMessage error={error.message} />;
  }

  if (!data) return <ErrorMessage error="User Not Found" />;

  const userId = data.id;

  return (
    <main className="flex flex-col grow bg-mineral-green text-ecru-white w-full font-cantarell">
      <div className="w-full pl-4">
        <GoBackButton />
      </div>
      <MemberProfile profile={data} />
      <MemberPosts userId={userId}/>
    </main>
  );
};

export default MemberProfilePage;