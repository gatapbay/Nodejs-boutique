const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const errorChecker = require('../middlewares/error-checker');

const controller = require('../controllers/auth');

router.post('/regist', [
    body('email', 'Định dạng email không hợp lệ.')
        .trim()
        .isEmail(),
    body('password', 'Mật khẩu chỉ cho phép chứa các kí tự alpha, ít nhất cần 8 kí tự')
        .trim()
        .isLength({ min: 8 })
        .isAlphanumeric(),
    body('fullname', 'Tên không thể bỏ trống')
        .trim()
        .isString()
        .not().isEmpty(),
], errorChecker, controller.regist);

router.post('/login', [
    body('email', 'Định dạng email không hợp lệ.')
        .isEmail(),
    body('password', 'Mật khẩu chỉ cho phép chứa các kí tự alpha, ít nhất cần 8 kí tự')
        .trim()
        .isLength({ min: 6 })
        .isAlphanumeric(),
], errorChecker, controller.login);

module.exports = router;