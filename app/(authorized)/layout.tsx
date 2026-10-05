import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/serverClient";

const MainAuthLayout = async ({ children }: { children: React.ReactNode }) => {
  
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: Profiles } = await supabase
    .from("Profiles")
    .select("username")
    .eq("id", user!.id)
    .single();

  return (
    <>
      <Header username={Profiles?.username} />
      {children}
    </>
  );
};

export default MainAuthLayout;