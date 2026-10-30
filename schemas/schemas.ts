import type { ImageFile } from "@/components/FileDropZone/types";
import * as z from "zod";

export const logInSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const signUpSchema = z
  .object({
    username: z.string(),
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" })
      .regex(/[A-Z]/, { message: "Must contain an uppercase letter" })
      .regex(/[0-9]/, { message: "Must contain least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Must containt at least one special character",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export const postSchema = z.object({
  title: z.string().min(6, "Post title should be at least six characters long"),
  content: z.string(),
  images: z.instanceof(FormData).optional(),
  category: z.string().min(1, "Choose a category"),
  price: z.number().optional(),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  post_type: z.string().min(1, "Choose the type of the post"),
  sold: z.boolean().optional(),
  slug: z.string().optional(),
});

export const userProfileSchema = z.object({
  name: z.string().min(1, "Name must be longer than 1 character").optional(),
  surname: z
    .string()
    .min(1, "Surname must be longer than 1 character")
    .optional(),
  username: z.string().min(4, "Username must be longer than 4 characters"),
  bio: z.string().optional(),
  interests: z.string().optional(),
  profile_image: z.instanceof(FormData).optional(),
  headline: z.string().max(140, "Maximum 140 characters").optional(),
  location: z.string().optional(),
  cover_image: z.instanceof(FormData).optional(),
});

export const postCommentSchema = z.object({
  content: z.string().min(1, "Comment must be at least 1 character long"),
});

export const postImageSchema = postSchema.omit({ images: true }).extend({
  image: z.array(z.custom<ImageFile>()).optional(),
});

export const updateUserPasswordSchema = z
  .object({
    currentPassword: z.string().min(5, "Current password is required"),
    newPassword: z
      .string()
      .min(5, "Password must be at least 5 characters long"),
    confirmPassword: z.string().min(5, "Confirm the new password"),
  })
  .superRefine((value, ctx) => {
    if (value.newPassword !== value.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });