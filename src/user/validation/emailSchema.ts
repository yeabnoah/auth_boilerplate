import { z } from "zod";

const emailSchema = z
  .string({
    message: "email is not in the correct format",
  })
  .email({
    message: "please enter a valid email address",
  });

export default emailSchema;
