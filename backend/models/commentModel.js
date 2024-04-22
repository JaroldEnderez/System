const mongoose = require('mongoose')

const commentModel = new mongoose.Schema({
    content: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true
    },
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Discussion', // Reference to the Discussion model
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const Comment = mongoose.model("Comment", commentModel);
module.exports = Comment;