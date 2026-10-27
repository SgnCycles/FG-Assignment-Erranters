"use server";
import { createClient } from "@/lib/supabase/serverClient";

const AddFollowerAction = async ({ memberId }: { memberId: string }) => {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");
  
  const { error } = await supabase.from("Followers").insert({
    member_id: memberId,
    user_id: user.id,
  });

  if (error) {
    console.error(error);
    return { error: "Failed to add to following" };
  }
};

export default AddFollowerAction;