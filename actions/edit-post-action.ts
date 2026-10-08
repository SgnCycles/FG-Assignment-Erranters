"use server";
import * as z from "zod";
import { postSchema } from "@/schemas/schemas";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import slugify from "@/lib/supabase/slugify";
import uploadImage from "@/lib/supabase/uploadPostImage";

const EditPost = async ({
  postdata,
  postId,
}: {
  postdata: z.infer<typeof postSchema>;
  postId: string;
}) => {
  const parsedData = postSchema.parse(postdata);
  const supabase = await createClient();
  const imageFiles = postdata.images?.getAll("image");

  const { data: post, error } = await supabase
    .from("Posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (!post) throw new Error("The post does not exist!");

  if (typeof imageFiles !== "undefined") {
    const files = imageFiles.filter(
      (file): file is File => file instanceof File,
    );

    if (files.length > 0) {
      const imageUrls = await Promise.all(
        files.map((file) => uploadImage(file)),
      );
      const postImages = imageUrls.map((imageUrl, index) => ({
        post_id: postId,
        image_url: imageUrl,
        position: index,
      }));
      await supabase.from("PostImages").insert(postImages).throwOnError();
    }
  }

  const { images, ...postData } = parsedData;

  const { data: updatedPost } = await supabase
    .from("Posts")
    .update({
      ...postData,
      slug: slugify(parsedData.title),
    })
    .eq("id", postId)
    .select("slug")
    .single()
    .throwOnError();

  revalidatePath("/");
  redirect(`/${updatedPost.slug}`);
};

export default EditPost;