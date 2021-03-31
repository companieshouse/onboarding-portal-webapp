const express = require('express');
const router = express.Router();
const { homePagesList } = require('../controllers/indexController');
const { loginPost } = require('../controllers/loginController');
const { loginGet } = require('../controllers/loginController');

router.get('/login', loginGet);
router.post('/login', loginPost);

router.get('/', homePagesList);

module.exports = router;
