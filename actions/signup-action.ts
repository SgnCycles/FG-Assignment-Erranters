"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { signUpSchema } from "@/schemas/schemas";
import * as z from "zod";

const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  
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

  if (error) {
    console.error(error);
    return { error: "Error While Signing Up" };
  }

  return { success: true };
};

export default SignUp;