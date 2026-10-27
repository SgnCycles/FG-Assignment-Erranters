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

  if (error) {
    console.error(error);
    return { error: "Error fetching User Profile", updatedProfile: null };
  }

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

  const { data: updatedProfile, error: updatedProfileError } = await supabase
    .from("Profiles")
    .update({
      ...parsedData,
      profile_image: profileImageUrl,
      cover_image: coverImageUrl,
    })
    .eq("id", userId)
    .select()
    .single()

  if (updatedProfileError) {
    console.error(updatedProfileError);
    return { error: "Error Updating User Profile", updatedProfile: null };
  }

  revalidatePath("/profile");
  return {updatedProfile: updatedProfile, error: null};
};

export default EditUserProfile;