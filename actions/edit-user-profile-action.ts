"use server";
import * as z from "zod";
import { userProfileSchema } from "@/schemas/schemas";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";
import uploadProfileImage from "@/lib/supabase/uploadProfileImage";

const EditUserProfile = async ({
  userData,
  userId,
}: {
  userData: z.infer<typeof userProfileSchema>;
  userId: string;
}) => {
  const parsedData = userProfileSchema.parse(userData);
  const supabase = await createClient();
  const profileImageFile = userData.profile_image?.get("image");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authorized");

  const { data: profile, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error("Error fetching User Profile");

  let profileImageUrl;

  if (typeof profileImageFile !== "undefined") {
    if (!(profileImageFile instanceof File) && profileImageFile !== null) {
      throw Error("Image is not in a valid format!");
    }
    profileImageUrl = profileImageFile ? await uploadProfileImage(profileImageFile) : null;
  } else {
    profileImageUrl = profile.profile_image;
  }

  const { data: updatedProfile } = await supabase
    .from("Profiles")
    .update({
      ...parsedData,
      profile_image: profileImageUrl,
    })
    .eq("id", userId)
    .select()
    .single()
    .throwOnError();

  revalidatePath("/profile");
  return updatedProfile;
};

export default EditUserProfile;