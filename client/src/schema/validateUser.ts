import { z } from "zod";

const pswRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const userValidation = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .regex(
      pswRegex,
      "Password must be at least eight characters,  one uppercase letter, one number and one special character",
    ),
});

export type SchemaValues = z.infer<typeof userValidation>;

export default userValidation;
