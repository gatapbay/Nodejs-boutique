module.exports = (req, res, next) => {
    if (!req.user || req.user.level < 1) {
        return res.status(403).json({ errors: ['Bạn không có quyền thực hiện hành động này'] });
    }
    req.level = req.user.level;
    next();
}