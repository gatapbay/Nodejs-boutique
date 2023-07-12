const express = require('express');
const router = express.Router();
const lang = require('../lang');
const { body, query } = require('express-validator');

const errorChecker = require('../middlewares/error-checker');
const isAuth = require('../middlewares/is-auth');

const controller = require('../controllers/client');


router.get('/products', controller.getProducts);
router.get('/product', [
    query('id', lang.E1).isString().not().isEmpty(),
], errorChecker, controller.getProduct);

router.get('/orders', isAuth, controller.getOrders);
router.post('/orders', isAuth, [
    body('fullname', lang.E7).isString().not().isEmpty(),
    body('phone', lang.E10).isMobilePhone().not().isEmpty(),
    body('address', lang.E11).isString().not().isEmpty(),
    body('orders', lang.E12).isArray({ min: 1 }),
], errorChecker, controller.createOrder);

router.get('/support', [
    query('id', lang.E1).isString().not().isEmpty(),
], errorChecker, controller.getSuport);

module.exports = router;