import { Response } from "express";
import { COOKIE_NAME } from "../properties";

export const setAuthTokenCookie = (res: Response, jwt: string): void => {
  res.cookie(
    COOKIE_NAME,
    jwt,
    { maxAge: 900000, httpOnly: true, sameSite: 'strict' }
  );
};
