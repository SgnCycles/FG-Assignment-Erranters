import type { ImageFile } from "@/components/FileDropZone/types";
import { postImageSchema } from "@/schemas/schemas";
import * as z from "zod";

export type FormValues = z.infer<typeof postImageSchema>;

export type CreatePostFormPropsType = {
  handleCreatePost: (values: FormValues) => void;
  isPending: boolean;
};