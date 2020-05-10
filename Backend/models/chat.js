const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    messages: [{
        text: String,
        deliverAt: String,
        sender: {type: String, required: true }
    }],
    users: [{
        name: String,
        userId: Schema.Types.ObjectId
    }]
})

const Chat = mongoose.model('chat', ChatSchema);

module.exports = Chat;