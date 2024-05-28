const mongoose = require('mongoose')

const logsModel = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Assuming you have a User model
    }
  });

const Logs = mongoose.model("Logs", commentModel);
module.exports = Logs;