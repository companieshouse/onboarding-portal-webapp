import { NextFunction } from "express";
import { login } from "../services/accountService";
import { register } from "../services/accountService";
import { Request, Response } from "express";

export const loginGet = (req: Request, res: Response): void => {
    const returnUri = req.query.return_to as string;
    
    return res.render('login', {RETURN_URL:encodeURI(returnUri)});
};

export const loginPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const password: string = req.body.password;
    const identifier: string = req.body.username;
    let returnTo = "";
    if (req.query.return_to) {
        returnTo = req.query.return_to.toString();
        console.log(returnTo);
    }

    try {
        await login(res, identifier, password);
        return res.redirect(`${returnTo}`);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return res.render('login', { error: 'Invalid Credentials', RETURN_URL: `${returnTo}` });
        }
        return next(error);
    }
};

export const registerGet = (req: Request, res: Response): void => {
    const returnUri = req.query.return_to as string;
    
    return res.render('register', {RETURN_URL:encodeURI(returnUri)});
};

export const registerPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const password: string = req.body.password;
    const email: string = req.body.email;
    const username: string = req.body.username;
    let returnTo = "";
    if (req.query.return_to) {
        returnTo = req.query.return_to.toString();
        console.log(returnTo);
    }

    try {
        await register(res, username, email, password);
        return res.redirect(`${returnTo}`);
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return res.render('register', { error: 'Error Creating Account', RETURN_URL: `${returnTo}` });
        }
        return next(error);
    }
};
