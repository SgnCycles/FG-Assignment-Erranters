"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export const DeleteUserAccountAction = async (userId: string) => {
  
  const supabase = await createClient();
  const { error } = await supabase.functions.invoke("delete-user");
  
  if (error) throw new Error(error.message);

  await supabase.auth.signOut();
  redirect("/");
};