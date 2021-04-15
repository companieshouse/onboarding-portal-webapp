import bodyParser = require('body-parser');
import createError = require('http-errors');
import express = require('express');
import nunjucks = require('nunjucks');
import path = require('path');
import cookieParser = require('cookie-parser');
import logger = require('morgan');
import dotenv = require('dotenv');
import { router } from "./routes";

import { Request, Response, NextFunction } from 'express';
import { ApiError } from './config/axiosConfig';

const app = express();
dotenv.config();

// view engine setup
nunjucks.configure('views', { autoescape: true, express: app });
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: ApiError, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
