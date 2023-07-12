const setup = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (!req.query.token) {
        return res.status(401).json({ errors: ['Unauthorized'] });
    }

    jwt.verify(req.query.token, setup.JWT_SECURITY_KEY, (e, data) => {
        if (!data) {
            return res.status(403).json({ errors: ['Xác thực thất bại, accessToken không còn nguyên vẹn hoặc hết thời hạn sử dụng.'] });
        }
        req.user = data;
        next();
    });
}