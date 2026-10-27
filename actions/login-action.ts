"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { logInSchema } from "@/schemas/schemas";
import * as z from "zod";

const LogIn = async (userdata: z.infer<typeof logInSchema>) => {

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(userdata);

  if (error) {
    console.error(error);
    return { error: "Error Loging In" };
  }

  return { success: true };
};

export default LogIn;