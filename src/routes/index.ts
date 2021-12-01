import express = require('express');
import { homePage } from '../controllers/homePageController';
import { infoPage } from '../controllers/infoPageController';
import { loginPost, registerGet, registerPost } from '../controllers/loginController';
import { loginGet } from '../controllers/loginController';
import { Router } from "express";
import { page } from '../controllers/pageController';
import { healthcheck } from '../controllers/healthCheckController';

export const router: Router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/register', registerPost);
router.get('/register', registerGet);

router.get('/', homePage);

router.get('/information-hub', infoPage);

router.get('/page/:page_id', page);

router.get('/healthcheck', healthcheck);