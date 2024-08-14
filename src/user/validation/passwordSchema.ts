import { z } from "zod";

const passwordSchema = z
  .string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message:
      "Password must be at least 8 characters long, contain at least one letter, one number, and one special character",
  });

export default passwordSchema;
