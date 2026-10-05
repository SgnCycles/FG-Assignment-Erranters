"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { postSchema } from "@/schemas/schemas";
import * as z from "zod";
import slugify from "@/lib/supabase/slugify";
import { revalidatePath } from "next/cache";
import uploadImage from "@/lib/supabase/uploadPostImage";

export const CreatePost = async (postdata: z.infer<typeof postSchema>) => {
  const parsedData = postSchema.parse(postdata);
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized access!");

  const imageFile = postdata.images?.get("image");

  if (
    !(imageFile instanceof File) &&
    imageFile !== null &&
    imageFile !== "undefined"
  ) {
    throw new Error("Image is not in a valid format");
  }

  const imageUrl =
    imageFile && imageFile !== "undefined"
      ? await uploadImage(imageFile)
      : null;

  let slug_id = crypto.randomUUID().slice(0, 8);
  const slug = `${slugify(parsedData.title)}-${slug_id}`;
  const { data, error } = await supabase.from("Posts").insert({
    ...parsedData,
    slug: slug,
    images: imageUrl,
    author: user.id,
  });

  if (error) console.log(error);
  revalidatePath("/");
  return { success: true, slug };
};
