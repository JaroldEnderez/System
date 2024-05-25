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
<<<<<<< HEAD
    enum: ['planned', 'in progress', 'completed', 'delayed'],
    default: 'planned'
=======
    enum: ['ongoing', 'completed', 'delayed'],
    default: 'ongoing'
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  dependencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Milestone'
<<<<<<< HEAD
  }]
=======
  }],
  tasks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
});

const Milestone = mongoose.model('Milestone', milestoneSchema);

module.exports = Milestone;
