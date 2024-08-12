import jwt, { JwtPayload } from "jsonwebtoken";
import payloadInterface from "../interface/payload";
import smtpEmailInterface from "../interface/smtpEmail";

const secret = process.env.SMTP_JWT_SECRET_KEY;

const emailVerifyToken = (
  token: string
): { status: boolean; payload?: smtpEmailInterface } => {
  if (!secret) {
    return { status: false };
  }

  try {
    const checkTokenValidity = jwt.verify(token, secret) as smtpEmailInterface;
    return { status: true, payload: checkTokenValidity };
  } catch (error) {
    console.error("Token verification error:", error);
    return { status: false };
  }
};

export default emailVerifyToken;
