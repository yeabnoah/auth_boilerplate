import { date, z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name is too short" })
    .max(32, { message: "Name is too long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  username: z
    .string()
    .min(2, { message: "Username is too short" })
    .max(32, { message: "Username is too long" }),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
      message:
        "Password must be at least 8 characters long, contain at least one letter, one number, and one special character",
    }),
  role: z.enum(["user", "admin"], {
    message: "role should be only admin or User",
  }),
  emailActivated: z.boolean().optional(),
});

export default userSchema;
