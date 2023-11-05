const mongoose = require('mongoose')

const modelData = {
    'logEntryModel': new mongoose.model('log_entry', new mongoose.Schema({
        question: String,
        category: String,
        notes: String,
        complexity: String,
        status: String
    }), 'log_entry'),

    // 'loginInfoModel': new mongoose.model('loginInfoModel', new mongoose.Schema({
    //     email: String,
    //     password: String
    // })),

    'usersInfoModel': new mongoose.mongoose.model('users_info', new mongoose.Schema({
        name: String,
        email: String,
        password: String
    }), 'user_info')
}

module.exports = modelData