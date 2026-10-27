"use server";
import { createClient } from "@/lib/supabase/serverClient";

const DeleteFollowAction = async ({ memberId }: { memberId: string }) => {
  
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase
    .from("Followers")
    .delete()
    .eq("member_id", memberId)
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return { error: "Failed to unfollow the member" };
  }
};

export default DeleteFollowAction;