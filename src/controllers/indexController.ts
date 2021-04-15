import { NextFunction } from 'express';
import { getHomePages } from '../services/contentService';
import { Request, Response } from "express";
import { AxiosError } from 'axios';

export const homePagesList = (req: Request, res: Response, next: NextFunction): void => {
  getHomePages()
    .then(function (data) {
      return res.render('index', {
        title: 'Home Pages',
        data: data
      });
    }).catch(function (error: AxiosError) {
      next(error);
    });
};
