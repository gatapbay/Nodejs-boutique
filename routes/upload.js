const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/is-auth');
const controller = require('../controllers/upload');

router.post('/image', isAuth, controller.uploadImage);

module.exports = router;