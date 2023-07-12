const setup = require('../config');
const multer = require('multer');

// Multer file
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const fileStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single('image');


exports.uploadImage = async (req, res, next) => {
    upload(req, res, function (err, data) {
        if (err || !req.file || !req.file.path) {
            return res.status(500).json({
                errors: ['Không thể upload file']
            })
        }
        res.status(201).json({
            data: ['/' + req.file.path.replace('\\', '/')]
        })
    });
};