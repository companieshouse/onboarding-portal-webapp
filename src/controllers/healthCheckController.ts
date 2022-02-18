import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';

export const healthcheck = (req: Request, res: Response): void => {
    res.status(StatusCodes.OK).send({ 'status': 'OK'});
};
