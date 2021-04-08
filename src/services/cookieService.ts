import { Response } from "express";

export const setAuthTokenCookie = (res: Response, jwt: string): void => {
  res.cookie(
    'token',
    jwt,
    { maxAge: 900000, httpOnly: true, sameSite: 'strict' }
  );
};
