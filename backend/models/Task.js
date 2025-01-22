const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  effort_days: {
    type: String,
    required: true,
  },
  due_date: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
