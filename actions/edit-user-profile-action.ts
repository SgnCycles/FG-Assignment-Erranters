"use server";
import * as z from "zod";
import { userProfileSchema } from "@/schemas/schemas";
import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";
import uploadProfileImage from "@/lib/supabase/uploadProfileImage";
import uploadCoverImage from "@/lib/supabase/uploadCoverImage";

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
  const coverImageFile = userData.cover_image?.get("image");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== userId) throw new Error("User not authorized");

  const { data: profile, error } = await supabase
    .from("Profiles")
    .select("*")
    .eq("id", userId)
    .single();

  // TO DO: add toast for error
  if (error) throw new Error("Error fetching User Profile");

  let profileImageUrl;
  let coverImageUrl;

  if (typeof profileImageFile !== "undefined") {
    if (!(profileImageFile instanceof File) && profileImageFile !== null) {
      throw Error("Profile image is not in a valid format!");
    }
    profileImageUrl = profileImageFile
      ? await uploadProfileImage(profileImageFile)
      : null;
  } else {
    profileImageUrl = profile.profile_image;
  }

  if (typeof coverImageFile !== "undefined") {
    if (!(coverImageFile instanceof File) && coverImageFile !== null) {
      throw Error("Cover image is not in a valid format!");
    }
    coverImageUrl = coverImageFile
      ? await uploadCoverImage(coverImageFile)
      : null;
  } else {
    coverImageUrl = profile.cover_image;
  }

  const { data: updatedProfile } = await supabase
    .from("Profiles")
    .update({
      ...parsedData,
      profile_image: profileImageUrl,
      cover_image: coverImageUrl,
    })
    .eq("id", userId)
    .select()
    .single()
    .throwOnError();

  // TO DO: add toast for the update profile error

  revalidatePath("/profile");
  return updatedProfile;
};

export default EditUserProfile;