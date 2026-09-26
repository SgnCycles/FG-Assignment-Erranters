"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { logInSchema } from "@/schemas/schemas";
import * as z from "zod";

export const LogIn = async (userdata: z.infer<typeof logInSchema>) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(userdata);
  if (error) throw error;
  return { success: true };
};