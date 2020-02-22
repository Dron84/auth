const
    mongoose = require('mongoose'),
    moment = require('moment'),
    date = moment().format('DD-MM-YYYY HH:mm');

const users = new mongoose.Schema(
    {
        login: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, default: "reader"},
        createAt: {type: String, default: date}
    },
)

module.exports = mongoose.model('users', users)