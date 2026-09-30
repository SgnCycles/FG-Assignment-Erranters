"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export const LogOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
};