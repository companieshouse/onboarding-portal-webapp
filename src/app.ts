import createError from 'http-errors';
import express = require('express');
import nunjucks = require('nunjucks');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import { router } from "./routes";

import { Request, Response, NextFunction } from 'express';
import { PATH_PREFIX } from './properties';

const app = express();

// view engine setup
const nunjucksEnv = nunjucks.configure('views', { autoescape: true, express: app });
nunjucksEnv.addGlobal("PATH_PREFIX", PATH_PREFIX);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(router);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = req.app.get('env') === 'development' ? err.message : {};
  res.locals.error = req.app.get('env') === 'development' ? err.stack : {};

  console.log(err);

  res.status(500).render('error');
  return next();
});


export default app;
