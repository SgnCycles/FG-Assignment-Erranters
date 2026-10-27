"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { signUpSchema } from "@/schemas/schemas";
import * as z from "zod";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email: userdata.email,
    password: userdata.password,
    options: {
      data: {
        username: userdata.username,
      },
    },
  });

  // add toast if there is an error with signing up
  if (error) throw new Error(error.message);
  
  return { success: true };
};