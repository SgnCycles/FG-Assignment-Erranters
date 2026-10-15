"use client";
import type { PostCategoryContextType } from "@/types/types";
import { createContext, useContext, useState, ReactNode } from "react";

const PostCategoryContext = createContext<PostCategoryContextType | null>(null);

export const PostCategoryProvider = ({ children }: { children: ReactNode }) => {
  const [postCategory, setPostCategory] = useState<string>("All");
  return (
    <PostCategoryContext.Provider value={{ postCategory, setPostCategory }}>
      {children}
    </PostCategoryContext.Provider>
  );
};

export const usePostCategoryContext = () => {
  return useContext(PostCategoryContext);
};