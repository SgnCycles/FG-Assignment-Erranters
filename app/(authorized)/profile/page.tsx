import UserProfileForm from "@/components/UserProfileForm";
import { getUserProfile } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const ProfilePage = async() => {
  const supabase = await createClient();
  const {
    data: {user}
  } = await supabase.auth.getUser();

  const {data, error} = await getUserProfile(user!.id);
  if (error) {
    throw new Error("Could not fetch profile");
  }

  if (!data) return;

  return (
    <main className="grow bg-mineral-green">
      <h1 className="heading">This is Profile Page</h1>
      <UserProfileForm
        initialValues={{
          name: data.name,
          surname: data.surname,
          username: data.username,
          bio: data.bio,
          profile_image: data.profile_image,
        }}
        userId={data.id}
      />
    </main>
  );
};

export default ProfilePage;
