"use server";
import { createClient } from "@/lib/supabase/serverClient";
import { postCommentSchema } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export const AddCommentAction = async ({
  commentData,
  postId,
}: {
  commentData: z.infer<typeof postCommentSchema>;
  postId: string;
}) => {
  const supabase = await createClient();
  const parsedData = postCommentSchema.parse(commentData);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { data, error } = await supabase
    .from("Comments")
    .insert({
      post_id: postId,
      author: user.id,
      parent_id: null,
      ...parsedData,
    })
    .throwOnError();

  if (error) console.log(error);
  revalidatePath("/");
};