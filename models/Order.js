const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'products'
        },
        amount: {
            type: Number
        }
    }],
});

module.exports = mongoose.model('orders', ordersSchema);