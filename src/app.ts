import createError from 'http-errors';
import express = require('express');
import nunjucks = require('nunjucks');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import { router } from "./routes";

import { Request, Response, NextFunction } from 'express';

const app = express();

// view engine setup
nunjucks.configure('views', { autoescape: true, express: app });
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

// error handler
app.use(function (err: Error, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.render('error');
});

export default app;
