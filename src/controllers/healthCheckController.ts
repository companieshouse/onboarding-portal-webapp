import { NextFunction } from 'express';
import { Request, Response } from "express";

export const healthcheck = (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).send();
    return;
};
