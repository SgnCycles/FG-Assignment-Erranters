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