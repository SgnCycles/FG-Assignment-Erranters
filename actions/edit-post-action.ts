"use server";
import * as z from "zod";
import { postSchema } from "@/schemas/schemas";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import slugify from "@/lib/supabase/slugify";
import uploadImage from "@/lib/supabase/uploadImage";

const EditPost = async ({
  postdata,
  postId,
}: {
  postdata: z.infer<typeof postSchema>;
  postId: string;
}) => {
  const parsedData = postSchema.parse(postdata);
  const supabase = await createClient();
  const imageFile = postdata.images?.get("image");

  const { data: post, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (!post) throw new Error("The post does not exist!");

  let imageUrl;

  if (typeof imageFile !== "undefined") {
    if (!(imageFile instanceof File) && imageFile !== null) {
      throw Error("Image is not in a valid format!");
    }
    imageUrl = imageFile ? await uploadImage(imageFile) : null;
  } else {
    imageUrl = post.images;
  }

  const { data: updatedPost } = await supabase
    .from("Posts")
    .update({
      ...parsedData,
      slug: slugify(parsedData.title),
      images: imageUrl,
    })
    .eq("id", postId)
    .select("slug")
    .single()
    .throwOnError();

  revalidatePath("/");
  redirect(`/${updatedPost.slug}`);
};

export default EditPost;
