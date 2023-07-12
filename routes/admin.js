const express = require('express');
const router = express.Router();
const lang = require('../lang');
const { body, query } = require('express-validator');

const errorChecker = require('../middlewares/error-checker');
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');
const controller = require('../controllers/admin');

router.get('/analitics', isAuth, isAdmin, controller.getAnalitics);

router.get('/products', isAuth, isAdmin, controller.getProducts);

router.get('/product', isAuth, isAdmin, [
    query('id', lang.E1).isString().not().isEmpty(),
], errorChecker, controller.getProduct);

router.post('/add-product', isAuth, isAdmin, [
    body('name', lang.E2).isString().not().isEmpty(),
    body('title', lang.E3).isString().not().isEmpty(),
    body('price', lang.E4).isFloat().not().isEmpty(),
    body('category', lang.E5).isString().not().isEmpty(),
    body('images', lang.E6).isArray({ min: 1 }),
], errorChecker, controller.addProduct);

router.post('/update-product', isAuth, isAdmin, [
    query('id', lang.E1).isString().not().isEmpty(),
    body('name', lang.E2).isString().not().isEmpty(),
    body('title', lang.E3).isString().not().isEmpty(),
    body('price', lang.E4).isFloat().not().isEmpty(),
    body('category', lang.E5).isString().not().isEmpty(),
    body('images', lang.E6).isArray({ min: 1 }),
], errorChecker, controller.updateProduct);

router.delete('/delete-product', isAuth, isAdmin, [
    query('id', lang.E1).isString().not().isEmpty(),
], errorChecker, controller.deleteProduct);


router.get('/users', isAuth, isAdmin, controller.getUsers);

router.post('/update-user', isAuth, isAdmin, [
    body('fullname', lang.E7).isString().not().isEmpty(),
    body('level', lang.E8).isInt({ min: 0, max: 9 }),
    query('id', lang.E1).trim().not().isEmpty(),
], errorChecker, controller.updateUser);

router.get('/orders', isAuth, isAdmin, controller.getOrders);
router.post('/update-order', isAuth, isAdmin, [
    query('id', lang.E1).isString().not().isEmpty(),
    body('status', lang.E15).isString().not().isEmpty(),
], errorChecker, controller.updateOrder);

router.get('/supports', isAuth, isAdmin, controller.getSuports);

module.exports = router;