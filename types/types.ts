import type { User } from "@supabase/supabase-js";
import type { UserProfileType } from "@/lib/supabase/queries";
import * as z from "zod";
import { postImageSchema } from "@/schemas/schemas";


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