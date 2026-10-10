import * as z from "zod";

export const logInSchema = z.object({
  email: z.email(),
  // password: z.string().min(8),
  password: z.string().min(5),
});

// export const signUpSchema = z
//   .object({
//     username: z.string(),
//     email: z.email(),
//     password: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters" })
//       .regex(/[A-Z]/, { message: "Contain at least one uppercase letter" })
//       .regex(/[0-9]/, { message: "Contain at least one number" })
//       .regex(/[^A-Za-z0-9]/, {
//         message: "Contain at least one special character",
//       }),
//     confirmPassword: z
//       .string()
//       .min(8, { message: "Please confirm your password" }),
//   })
//   .superRefine((val, ctx) => {
//     if (val.password !== val.confirmPassword) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Passwords do not match",
//         path: ["confirmPassword"],
//       });
//     }
//   });

//temp replacement for smoother testing
export const signUpSchema = z
  .object({
    username: z.string(),
    email: z.email(),
    password: z
      .string()
      .min(5, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Please confirm your password" }),
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
});

export const postCommentSchema = z.object({
  content: z.string().min(1, "Comment must be at least 1 character long"),
});