const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false
    },
    client: {
        type: String,
        required: true
    },
    last: {
        type: Number,
        required: true
    },
    messages: [{
        sender: String,
        content: String,
        time: Number
    }],
});

module.exports = mongoose.model('messages', messageSchema);