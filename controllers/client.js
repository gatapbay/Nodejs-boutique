const setup = require('../config');
const lang = require('../lang');
const confirmMail = require('../mail/order-confirmation');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Message = require('../models/Message');


exports.getProducts = (req, res, next) => {
    const filter = {};
    if (req.query.category) filter.category = req.query.category.toLowerCase() || undefined;
    Product.find(filter).then(rs => {
        res.status(200).json({
            data: rs
        });
    }).catch(e => { res.status(500).send() })
};

exports.getProduct = (req, res, next) => {
    Product.find({ _id: req.query.id }).then(rs => {
        res.status(200).json({
            data: rs
        });
    }).catch(e => { res.status(500).send() })
};

exports.getOrders = (req, res, next) => {
    Order.find({ userId: req.user.id }).sort({ time: -1 }).populate('products.product').then(rs => {
        res.status(200).json({
            data: rs
        });
    }).catch(e => { res.status(500).send() })
};

exports.createOrder = async (req, res, next) => {
    const products = await Product.find().exec();
    const error = [];
    const orders = [];
    let total = 0;

    req.body.orders.forEach(el => {
        const focusProduct = products.find(x => x._id.toString() === el.id);
        if (!focusProduct) return error.push(el.name + ':  ' + lang.E13);
        if (focusProduct.count < el.amount) return error.push(el.name + ':  ' + lang.E14 + ' ( MAX: ' + focusProduct.count + ')');
        orders.push({
            product: el.id,
            amount: el.amount
        });
        total += el.amount * focusProduct.price;
    });

    if (error.length > 0) {
        return res.status(422).json({ errors: error });
    } else {
        const addOrder = new Order({
            userId: req.user.id,
            totalPrice: total,
            fullname: req.body.fullname,
            phone: req.body.phone,
            address: req.body.address,
            time: Date.now(),
            status: 'INPROGRESS',
            products: orders
        });
        addOrder.save().then(rs => rs.populate('userId products.product')).then(rs => {
            rs.products.forEach(el => {
                Product.findOne({ _id: el.product._id.toString() }).then(rs => {
                    rs.count -= el.amount
                    return rs.save();
                });
            });
            confirmMail(rs);
            res.status(201).json();
        }).catch(e => { console.log(e); res.status(500).send() });;
    }
};

exports.getSuport = (req, res, next) => {
    Message.findOne({ client: req.query.id }).then(rs => {
        res.status(200).json({
            data: rs ?? {}
        });
    }).catch(e => { res.status(500).send() })
};