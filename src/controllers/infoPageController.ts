import { NextFunction } from 'express';
import { getHomePageContent } from '../services/contentService';
import { Request, Response } from "express";

export const infoPage = (req: Request, res: Response, next: NextFunction): void => {
  getHomePageContent()
    .then(function (data) {
      return res.render('information-hub', {
        title: 'Key',
        data: data
      });
    }).catch(function (error: Error) {
      next(error);
    });
};
