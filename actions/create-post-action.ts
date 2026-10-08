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

  const imageFiles = postdata.images?.getAll("image");

  const imageUrls = imageFiles?.filter(
    (file): file is File => file instanceof File,
  ).length
    ? await Promise.all(
        imageFiles
          .filter((file): file is File => file instanceof File)
          .map((file) => uploadImage(file)),
      )
    : [];

  let slug_id = crypto.randomUUID().slice(0, 8);
  const slug = `${slugify(parsedData.title)}-${slug_id}`;
  const { images, ...postData } = parsedData;
  const { data, error } = await supabase
    .from("Posts")
    .insert({
      ...postData,
      slug: slug,
      author: user.id,
    })
    .select("id")
    .single()
    .throwOnError();

  if (imageUrls.length > 0) {
    const postImages = imageUrls.map((imageUrl, index) => ({
      post_id: data.id,
      image_url: imageUrl,
      position: index,
    }));

    await supabase.from("PostImages").insert(postImages).throwOnError();
  }

  if (error) console.log(error);
  revalidatePath("/");
  return { success: true, slug };
};