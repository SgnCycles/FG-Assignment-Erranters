import type { User } from "@supabase/supabase-js";
import type { UserProfileType } from "@/lib/supabase/queries";
import type { Tables } from "@/lib/supabase/database.types";
import { postImageSchema } from "@/schemas/schemas";
import * as z from "zod";

export type userContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userProfile: UserProfileType | null;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfileType | null>>;
};

export type PostCategoryContextType = {
  postCategory: string;
  setPostCategory: React.Dispatch<React.SetStateAction<string>>;
};

export type FormValues = z.infer<typeof postImageSchema>;

export type userProfileProps = Pick<
  Tables<"Profiles">,
  | "id"
  | "name"
  | "surname"
  | "username"
  | "bio"
  | "profile_image"
  | "interests"
  | "headline"
  | "location"
  | "cover_image"
>;

export type PostFormProps = Pick<
  Tables<"Posts">,
  | "id"
  | "title"
  | "content"
  | "category"
  | "post_type"
  | "price"
  | "location"
  | "slug"
> & { author: { id: string } } & {
  PostImages: Pick<Tables<"PostImages">, "id" | "image_url" | "position">[];
};