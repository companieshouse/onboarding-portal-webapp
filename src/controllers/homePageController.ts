import { NextFunction } from 'express';
import { getHomePageContent } from '../services/contentService';
import { Request, Response } from "express";
import { AxiosError } from 'axios';

export const homePage = (req: Request, res: Response, next: NextFunction): void => {
  getHomePageContent()
    .then(function (data) {
      return res.render('index', {
        title: 'Home Pages',
        data: data
      });
    }).catch(function (error: AxiosError) {
      next(error);
    });
};
