const mongoose = require('mongoose');

const discussionSchema = new mongoose.Schema({
  
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },

  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{ // Define comments as an array of ObjectId references
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }]

});

const Discussion = mongoose.model('Discussion', discussionSchema);

module.exports = Discussion;
