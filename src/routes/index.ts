import express = require('express');
import { homePage } from '../controllers/homePageController';
import { infoPage } from '../controllers/infoPageController';
import { articlePage } from '../controllers/articlePageController';
import { loginPost, registerPost } from '../controllers/loginController';
import { loginGet } from '../controllers/loginController';
import { Router } from "express";
import { page } from '../controllers/pageController';

export const router: Router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/register', registerPost);

router.get('/', homePage);

router.get('/information-hub', infoPage);

router.get('/article', articlePage);

router.get('/page/:page_id', page);
