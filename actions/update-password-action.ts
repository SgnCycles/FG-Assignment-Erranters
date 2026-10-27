"use server";
import { createClient } from "@/lib/supabase/serverClient";

export const UpdatePasswordAction = async (
  currentPassword: string,
  newPassword: string,
) => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized access");
  }

  const { error: passwordError } = await supabase.auth.updateUser({
    password: newPassword,
    current_password: currentPassword,
  });

  // add toast if there is an error with updating the password
  if (passwordError) {
    throw passwordError;
  }

  return { success: true };
};