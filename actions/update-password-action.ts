"use server";
import { createClient } from "@/lib/supabase/serverClient";

const UpdatePasswordAction = async (
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

  if (passwordError) {
    console.error(passwordError);
    return { error: "Error Updating Password" };
  }

  return { success: true };
};

export default UpdatePasswordAction;