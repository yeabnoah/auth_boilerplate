import jwt from "jsonwebtoken";
import payloadInterface from "../interface/payload";
import { config } from "dotenv";
import EmailDoubleAuthInterface from "../interface/2faEmail";
import smtpEmailInterface from "../interface/smtpEmail";

config();

const secret = process.env.SMTP_JWT_SECRET_KEY!;
const expiresIn = process.env.SMTP_JWT_EXPIRATION!;

const smtpGenerateToken = (payload: smtpEmailInterface): string => {
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

export default smtpGenerateToken;
