import { NextFunction } from 'express';
import { getAllArticles } from '../services/contentService';
import { Request, Response } from "express";

export const infoPage = (req: Request, res: Response, next: NextFunction): void => {
  getAllArticles()
    .then(function (data) {
      return res.render('information-hub', {
        data: data
      });
    }).catch(function (error: Error) {
      next(error);
    });
};
