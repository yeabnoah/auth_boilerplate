import { Request, Response } from "express";

const githubOauth = (req: Request, res: Response) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const callbackUrl = process.env.GITHUB_CALLBACK_URL;
  const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${callbackUrl}`;

  res.redirect(url);
};

export default githubOauth;
