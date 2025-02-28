import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().max(100),
  password: z
    .string()
    .min(6)
    .max(100)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%\.^&*])/,
      "Пароль должен содержать как минимум одну строчную букву, одну заглавную букву, одну цифру и один специальный символ."
    ),
});

export const registerSchema = z
  .object({
    username: z.string().min(3).max(30),
    confirmPassword: z.string(),
  })
  .and(loginSchema)
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
