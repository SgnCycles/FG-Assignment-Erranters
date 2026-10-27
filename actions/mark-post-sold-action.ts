"use server";
import { createClient } from "@/lib/supabase/serverClient";

const MarkPostSoldAction = async ({
  postId,
  sold,
}: {
  postId: string;
  sold: boolean;
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized access");

  const { error } = await supabase
    .from("Posts")
    .update({ sold })
    .eq("id", postId)
    .eq("author", user.id);

  if (error) {
    console.error(error);
    return { error: "Error Marking Post Sold" };
  }
};

export default MarkPostSoldAction;