import { NextFunction } from 'express';
import { getPageContent } from '../services/contentService';
import { Request, Response } from "express";
import { AxiosError } from 'axios';

export const page = (req: Request, res: Response, next: NextFunction): void => {
    const pageId = req.params["page_id"];

    getPageContent(pageId)
        .then(function (data) {
            return res.render('index', {
                title: pageId,
                data: data
            });
        }).catch(function (error: AxiosError) {
            next(error);
        });
};
