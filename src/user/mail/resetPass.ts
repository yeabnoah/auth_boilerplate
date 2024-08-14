import { Request, Response } from "express";
import nodemailer from "nodemailer";
import User from "../model/user";

const resetPasswordEmailSender = async (senderEmail: string, link: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from:
        '"Tech Nerd Auth BoilerPlate" <' + process.env.SMTP_EMAIL_USER + ">",
      to: senderEmail,
      subject: "Reset Password Verification Email",
      html: `
        <body>
          <div>
            <h1 style="background-color: aqua; color: black; padding: 10px;">
              Please Verify Your Email:
            </h1>
            <p>Click the link below to authenticate:</p>
            <a href="${link}">${link}</a>
          </div>
        </body>
      `,
    });

    return info.messageId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default resetPasswordEmailSender;
