import { NextFunction } from 'express';
import { getHomePageContent } from '../services/contentService';
import { Request, Response } from "express";

export const homePage = (req: Request, res: Response, next: NextFunction): void => {
  getHomePageContent()
    .then(function (data) {
      return res.render('index', {
        title: 'Onboarding platform',
        data: data
      });
    }).catch(function (error: Error) {
      next(error);
    });
};
