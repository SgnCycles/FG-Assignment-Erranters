import { ImageFile } from "@/components/FileDropZone/types";
import { postSchema } from "@/schemas/schemas";
import * as z from "zod";

const postImageSchema = postSchema.omit({ images: true }).extend({
  image: z.array(z.custom<ImageFile>()).optional(),
});

export type FormValues = z.infer<typeof postImageSchema>;

export type CreatePostFormPropsType = {
  handleCreatePost: (values: FormValues) => void;
  error: Error | null;
  isPending: boolean;
};