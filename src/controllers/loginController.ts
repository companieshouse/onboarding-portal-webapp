import { NextFunction } from "express";
import { login } from "../services/accountService";
import { register } from "../services/accountService";
import { Request, Response } from "express";

  export const loginGet = (req: Request, res: Response): any => {
    return res.render('login');
  };

  export const loginPost = (req: Request, res: Response, next: NextFunction): any => {
    const password: string = req.body.password;
    switch (req.body.formName) {
      case 'login': {
        const identifier = req.body.username;

        return login(res, identifier, password).then(function () {
          return res.redirect(`${process.env.PATH_PREFIX}/`);
        }).catch(error => {
          if (error.response && error.response.status === 400) {
            return res.render('login', { error: 'Invalid Credentials' });
          }
          return next(error);
        });
      }

      case 'register': {
        const email = req.body.email;
        const username = req.body.username;

        return register(res, username, email, password).then(function () {
          return res.redirect(`${process.env.PATH_PREFIX}/`);
        });
      }
    }
  };