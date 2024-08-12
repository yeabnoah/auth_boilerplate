import { Request, Response } from "express";
import nodemailer from "nodemailer";
import User from "../model/user";

const emailSender = async (senderEmail: string, link: string) => {
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
      from: '"Auth is calling 😎🔥" <' + process.env.SMTP_EMAIL_USER + ">",
      to: senderEmail,
      subject: "EMAIL AUTHENTICATION REQUEST",
      html: `
        <body>
          <div>
            <h1 style="background-color: red; color: white; padding: 10px;">
              Here is your authentication email:
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

export default emailSender;
