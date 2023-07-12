const setup = require('../config');
const lang = require('../lang');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Message = require('../models/Message');

exports.getAnalitics = async (req, res, next) => {
    try {
        const results = {};
        results.users = await User.find({}, '_id').countDocuments();
        results.products = await Product.find({}, '_id').countDocuments();
        const orders = await Order.find({}, 'totalPrice').exec();
        results.orders = orders.length;
        results.earned = 0;
        orders.forEach(o => {
            results.earned += o.totalPrice
        })
        res.status(200).json({ data: results })
    } catch (error) {
        res.status(500).send()
    }
};

exports.getProducts = (req, res, next) => {
    Product.find().then(rs => {
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

exports.addProduct = (req, res, next) => {
    if (req.user.level < setup.PRODUCTS_MANAGER_LEVEL) {
        return res.status(403).json({ errors: [lang.E403] });
    }
    req.body.userId = req.user.id;
    const product = new Product(req.body);
    product.save().then(rs => {
        res.status(201).json({
            data: rs
        })
    }).catch(e => { console.log(e); res.status(500).send() })
};

exports.updateProduct = async (req, res, next) => {
    const focusProduct = await Product.findOne({ _id: req.query.id }).exec();
    if (req.user.level < setup.PRODUCTS_MANAGER_LEVEL) {
        return res.status(403).json({ errors: [lang.E403] });
    }
    if (!focusProduct) {
        return res.status(404).json({ errors: [lang.E9] });
    }
    focusProduct.category = req.body.category.toLowerCase();
    focusProduct.name = req.body.name;
    focusProduct.title = req.body.title;
    focusProduct.desc = req.body.desc;
    focusProduct.price = req.body.price;
    focusProduct.images = req.body.images;
    focusProduct.count = req.body.count;
    focusProduct.save().then(rs => {
        res.status(200).json({
            data: rs
        })
    }).catch(e => { console.log(e); res.status(500).send() });
};

exports.deleteProduct = (req, res, next) => {
    if (req.user.level < setup.PRODUCTS_MANAGER_LEVEL) {
        return res.status(403).json({ errors: [lang.E403] });
    }
    Product.findOneAndDelete({ _id: req.query.id }).then(() => {
        res.status(204).json();
    }).catch(e => { console.log(e); res.status(500).send() })
};


exports.getUsers = (req, res, next) => {
    if (req.user.level < setup.USERS_MANAGER_LEVEL) {
        return res.status(403).json({ errors: [lang.E403] });
    }
    User.find().sort({ level: -1 }).then(rs => {
        res.status(200).json({
            data: rs
        });
    }).catch(e => { res.status(500).send() })
};

exports.updateUser = async (req, res, next) => {
    const focusUser = await User.findOne({ _id: req.query.id }).exec();
    if ((req.user.level < setup.USERS_MANAGER_LEVEL) || (req.user.level <= focusUser.level)) {
        return res.status(403).json({ errors: [lang.E403] });
    }
    focusUser.fullname = req.body.fullname;
    focusUser.level = req.body.level;
    focusUser.save().then(rs => {
        res.status(200).json({ data: rs })
    }).catch(e => { res.status(500).send() })
};

exports.getOrders = (req, res, next) => {
    Order.find().sort({ time: -1 }).populate('products.product').then(rs => {
        res.status(200).json({
            data: rs
        });
    }).catch(e => { res.status(500).send() })
};

exports.updateOrder = async (req, res, next) => {
    if ((req.user.level < setup.ORDER_MANAGER_LEVEL)) {
        return res.status(403).json({ errors: [lang.E403] });
    }

    Order.findOne({ _id: req.query.id }).then(rs => {
        rs.status = req.body.status;
        return rs.save();
    }).catch(e => { res.status(500).send() })

    res.json();
};

exports.getSuports = (req, res, next) => {
    if ((req.user.level < setup.SUPPORT_LEVEL)) {
        return res.status(403).json({ errors: [lang.E403] });
    }
    Message.find().populate('userId').sort({ last: -1 }).then(rs => {
        res.status(200).json({
            data: rs
        });
    }).catch(e => { res.status(500).send() })
};