"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

const DeleteUserAccountAction = async (userId: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");
  const { error } = await supabase.functions.invoke("delete-user");

  if (error) {
    console.error(error);
    return { error: "Failed to delete user account" };
  }

  await supabase.auth.signOut();
  redirect("/");
};

export default DeleteUserAccountAction;