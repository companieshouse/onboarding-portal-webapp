import { NextFunction } from "express";
import { login } from "../services/accountService";
import { register } from "../services/accountService";
import { Request, Response } from "express";
import { PATH_PREFIX } from '../properties';

export const loginGet = (req: Request, res: Response): void => {
    return res.render('login');
};

export const registerPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const password: string = req.body.password;
    const email: string = req.body.email;
    const username: string = req.body.username;
    let returnTo: string;
    if (req.query.return_to) {
        returnTo = req.query.return_to.toString();
    }

    try {
        await register(res, username, email, password);
        return res.redirect(`${PATH_PREFIX}/${returnTo}`);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return res.render('login', { error: 'Error Creating Account' });
        }
        return next(error);
    }
};

export const loginPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const password: string = req.body.password;
    const identifier: string = req.body.username;
    let returnTo: string;
    if (req.query.return_to) {
        returnTo = req.query.return_to.toString();
    }

    try {
        await login(res, identifier, password);
        return res.redirect(`${PATH_PREFIX}/${returnTo}`);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return res.render('login', { error: 'Invalid Credentials' });
        }
        return next(error);
    }
};