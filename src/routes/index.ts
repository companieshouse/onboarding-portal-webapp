import express = require('express');
import { homePagesList } from '../controllers/indexController';
import { loginPost } from '../controllers/loginController';
import { loginGet } from '../controllers/loginController';
import { Router } from "express";

export const router: Router = express.Router();

router.get('/login', loginGet);
router.post('/login', loginPost);

router.get('/', homePagesList);
