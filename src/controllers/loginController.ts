import { NextFunction } from "express";
import { login } from "../services/accountService";
import { register } from "../services/accountService";
import { Request, Response } from "express";
import { PATH_PREFIX } from '../utils/properties';

export const loginGet = (req: Request, res: Response): void => {
    return res.render('login');
};

export const loginPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const password: string = req.body.password;
    switch (req.body.formName) {
        case 'login': {
            const identifier = req.body.username;

            try {
                await login(res, identifier, password);
                return res.redirect(`${PATH_PREFIX}/`);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    return res.render('login', { error: 'Invalid Credentials' });
                }
                return next(error);
            }
        }

        case 'register': {
            const email = req.body.email;
            const username = req.body.username;

            await register(res, username, email, password);
            return res.redirect(`${PATH_PREFIX}/`);
        }
    }
};