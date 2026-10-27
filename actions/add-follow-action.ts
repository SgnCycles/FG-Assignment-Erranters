"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const AddFollowerAction = async ({ memberId }: { memberId: string }) => {

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");
  
  const { error } = await supabase.from("Followers").insert({
    member_id: memberId,
    user_id: user.id,
  });

// TO DO: add toast for the add follower error
  if (error) throw new Error(error.message);
};