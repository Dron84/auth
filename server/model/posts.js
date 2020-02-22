const
    mongoose = require('mongoose'),
    moment = require('moment'),
    date = moment().format('DD-MM-YYYY HH:mm');

const posts = new mongoose.Schema(
    {
        title: {type: String,required: true},
        description: {type: String,required: true},
        claps: {type: Number, default: 0},
        createdAt: {type: String, default: date},
        updateAt: {type: String, default: date},
        userId: {type: String, required: true},
    }
)

module.exports = mongoose.model('posts', posts)