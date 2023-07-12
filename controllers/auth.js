const setup = require('../config');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.regist = async (req, res, next) => {
    if (await User.findOne({ email: req.body.email }).exec()) {
        return res.status(422).json({ errors: ['Email đã tồn tại trên hệ thống.'] });
    }

    bcrypt.genSalt(5, function (e, salt) {
        bcrypt.hash(req.body.password, salt, function (e, hash) {
            const register = new User({
                fullname: req.body.fullname,
                email: req.body.email,
                password: hash
            });
            register.save().then((rs) => {
                const exp = 1000 * 60 * 60 * 24 * 30;
                const token = jwt.sign({
                    id: rs._id,
                    email: rs.email,
                    fullname: rs.fullname,
                    level: 0
                }, setup.JWT_SECURITY_KEY, { expiresIn: setup.JWT_TOKEN_EXPIRES });

                res.status(201)
                    .cookie('token', token, { maxAge: exp })
                    .cookie('email', rs.email, { maxAge: exp })
                    .cookie('fullname', rs.fullname, { maxAge: exp })
                    .cookie('id', rs._id, { maxAge: exp })
                    .cookie('level', 0, { maxAge: exp })
                    .json({
                        data: { email: rs.email, fullname: rs.fullname, level: 0, id: rs._id },
                        token
                    });
            })
        });
    });
};

exports.login = async (req, res, next) => {
    const userData = await User.findOne({ email: req.body.email }).exec();
    if (!userData) {
        return res.status(422).json({ errors: ['Tài khoản không tồn tại.'] });
    }

    bcrypt.compare(req.body.password, userData.password).then(isMath => {
        if (!isMath) return res.status(422).json({ errors: ['Mật khẩu không chính xác.'] });

        const exp = 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({
            id: userData._id,
            email: userData.email,
            fullname: userData.fullname,
            level: userData.level
        }, setup.JWT_SECURITY_KEY, { expiresIn: setup.JWT_TOKEN_EXPIRES });

        res.status(201)
            .cookie('token', token, { maxAge: exp })
            .cookie('email', userData.email, { maxAge: exp })
            .cookie('fullname', userData.fullname, { maxAge: exp })
            .cookie('id', userData._id, { maxAge: exp })
            .cookie('level', userData.level, { maxAge: exp })
            .json({
                data: { email: userData.email, fullname: userData.fullname, level: userData.level, id: userData._id },
                token
            });
    })
};