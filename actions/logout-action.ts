"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

const LogOut = async () => {
  
  const supabase = await createClient();
  const {error} = await supabase.auth.signOut();
  
  if (error) {
    console.error(error);
    return { error: "Error Loging Out" };
  }
  redirect("/");
};

export default LogOut;