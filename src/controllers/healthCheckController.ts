import { Request, Response } from "express";

export const healthcheck = (req: Request, res: Response): void => {
    res.status(200).send();
    return;
};
