import { NextFunction } from 'express';
import { getAllArticles } from '../services/contentService';
import { Request, Response } from "express";
import { convertPageToSanitisedHTML } from '../services/markdownHtmlConverterService';
import { Page } from '../types/page';

export const infoPage = (req: Request, res: Response, next: NextFunction): void => {
  getAllArticles()
    .then(async function (data) {
      const convertedPages: Array<Page> = [];

      for await (const page of data) {
        await convertPageToSanitisedHTML(page).then(convertedPage => {
          convertedPages.push(convertedPage);
        });
      }

      return res.render('information-hub', {
        data: convertedPages
      });
    }).catch(function (error: Error) {
      next(error);
    });
};
