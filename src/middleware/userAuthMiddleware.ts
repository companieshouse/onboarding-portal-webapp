import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { CMS_API_URL, COOKIE_NAME } from "../properties";

export const userAuthMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  const cookie = req.cookies[COOKIE_NAME];

  console.log("Cookie: " + cookie);

  if (!cookie) {
    return res.redirect("/login?return_to="+req.originalUrl);
  }
  
  if (await validateCookie(cookie)) {
    return next();
  }

  return res.redirect("/login?return="+req.originalUrl);
};

async function validateCookie(cookie: string): Promise<boolean> {
  try {
    await axios({
      method: 'get',
      url: `${CMS_API_URL}/users/me`,
      headers: {
        Authorization: `Bearer ${cookie}`
      }
    });
    return await Promise.resolve(true);
  } catch (error) {
    // Handle error.
    console.log('An error occurred:', error.message);
    return await Promise.resolve(false);
  }
}