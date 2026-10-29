"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

const DeleteUserAccountAction = async (userId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return { success: false, error: "You must log in to delete your account!" };

  const { error } = await supabase.functions.invoke("delete-user");

  if (error) {
    console.error(error);
    return { success: false, error: "Failed to delete user account" };
  }

  await supabase.auth.signOut({ scope: "local" });
  redirect("/");
};

export default DeleteUserAccountAction;