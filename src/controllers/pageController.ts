import { NextFunction } from 'express';
import { getPageContent } from '../services/contentService';
import { Request, Response } from "express";
import { AxiosError } from 'axios';
import { convertPageToSanitisedHTML } from '../services/markdownHtmlConverterService';

export const page = (req: Request, res: Response, next: NextFunction): void => {
    const pageId = req.params["page_id"];

    getPageContent(pageId)
        .then(async function (data) {
            const convertedPage = await convertPageToSanitisedHTML(data);

            return res.render(`templates/${data.template_id}`, {
                data: convertedPage
            });
        }).catch(function (error: AxiosError) {
            next(error);
        });
};
