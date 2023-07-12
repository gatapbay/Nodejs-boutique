const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('products', productSchema);