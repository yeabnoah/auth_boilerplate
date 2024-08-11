import jwt from "jsonwebtoken";
import payloadInterface from "../interface/payload";
import { config } from "dotenv";

config();

const secret = process.env.JWT_SECRET_KEY!;
const expiresIn = process.env.JWT_EXPIRATION!;

const generateToken = (payload: payloadInterface): string => {
  if (!secret) {
    throw new Error(
      "JWT secret key is not defined in the environment variables."
    );
  }

  if (!expiresIn) {
    throw new Error(
      "JWT expiration time is not defined in the environment variables."
    );
  }

  try {
    const token = jwt.sign(payload, secret, {
      expiresIn,
    });

    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    throw new Error("Failed to generate JWT");
  }
};

export default generateToken;
