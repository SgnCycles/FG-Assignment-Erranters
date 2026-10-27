"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const DeleteFollowAction = async ({ memberId }: { memberId: string }) => {
  
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

  // TO DO: add toast if there is an error with removing the following
  if (error) throw new Error(error.message)
};