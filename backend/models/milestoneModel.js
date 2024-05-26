const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'delayed'],
    default: 'ongoing'
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone'
  }],
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;
