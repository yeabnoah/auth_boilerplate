import { Request, Response } from "express";

const googleOauth = (req: Request, res: Response) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const callbackUrl = process.env.GOOGLE_CALLBACK_URL;

  const redirectUrl = `https://google.com`;
};

export default googleOauth;

// i was working with the Google Oauth stuff
