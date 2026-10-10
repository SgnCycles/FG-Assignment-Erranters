import { Tables } from "@/lib/supabase/database.types";

export type ImageFile = File & {
  preview: string;
};

export type FileDropZonePropsType = {
  value: ImageFile[] | undefined;
  onChange: (files: ImageFile[]) => void;
  // initialImages?: Pick<Tables<"PostImages">, "id" | "image_url" | "position">[];
  // removePostImage?: (id: string) => void;
};
