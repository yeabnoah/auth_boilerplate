import jwt, { JwtPayload } from "jsonwebtoken";
import payloadInterface from "../interface/payload";

const secret = process.env.JWT_SECRET_KEY;

const verifyToken = (
  token: string
): { status: boolean; payload?: payloadInterface } => {
  if (!secret) {
    return { status: false };
  }

  try {
    const checkTokenValidity = jwt.verify(token, secret) as payloadInterface;
    return { status: true, payload: checkTokenValidity };
  } catch (error) {
    console.error("Token verification error:", error);
    return { status: false };
  }
};

export default verifyToken;
