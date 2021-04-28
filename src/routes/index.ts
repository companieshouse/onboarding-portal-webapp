import express = require('express');
import { homePage } from '../controllers/homePageController';
import { loginPost, registerPost } from '../controllers/loginController';
import { loginGet } from '../controllers/loginController';
import { Router } from "express";
import { page } from '../controllers/pageController';

export const router: Router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost);
router.post('/register', registerPost);

router.get('/', homePage);

router.get('/page/:page_id', page);
