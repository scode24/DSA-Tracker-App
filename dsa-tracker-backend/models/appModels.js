const mongoose = require("mongoose");

const modelData = {
  logEntryModel: new mongoose.model(
    "log_entry",
    new mongoose.Schema({
      userId: String,
      question: String,
      link: String,
      topic: String,
      complexity: String,
      note: String,
      status: String,
    }),
    "log_entry"
  ),

  // 'loginInfoModel': new mongoose.model('loginInfoModel', new mongoose.Schema({
  //     email: String,
  //     password: String
  // })),

  usersInfoModel: new mongoose.mongoose.model(
    "users_info",
    new mongoose.Schema({
      name: String,
      email: String,
      password: String,
    }),
    "user_info"
  ),
};

module.exports = modelData;
