import { z } from "zod";

export const signUpformSchema = z.object({
  fullName: z.string().min(3),
  mobileNumber: z
    .string()
    .length(10, { message: "Mobile number must be 10 digits" })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Mobile number can only contain numbers",
    }),
  password: z.string().min(8),
});
