import { Request, Response } from "express";
import User from "../model/user";
import smtpGenerateToken from "../token/emailGenerateToken";
import emailSender from "../mail/email";
import resetPasswordEmailSender from "../mail/resetPass";

const resetPassword = async (req: Request, res: Response) => {
  const user = req.user;

  const userFromDatabase = await User.findById(user?.id);

  const emailToken = await smtpGenerateToken({
    email: userFromDatabase?.email as string,
  });

  const verificationEmailLink = `http://localhost:3000/user/resetPasswordHandler/?token=${emailToken}`;

  const sendEmail = await resetPasswordEmailSender(
    userFromDatabase?.email as string,
    verificationEmailLink
  );

  res.status(201).json({
    emailResponse: verificationEmailLink,
    message: "Email sent successfully",
  });
};

export default resetPassword;
