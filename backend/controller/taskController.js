const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
    console.log('Incoming Request Body:', req.body);
  
    const { title, description, effort_days, due_date } = req.body;
  
    // Validate required fields
    if (!title || !effort_days || !due_date) {
      return res.status(400).json({ message: 'title, effort_days, and due_date are required' });
    }
  
    console.log('Creating Task with:', { title, effort_days, due_date });
  
    try {
      const task = new Task({ title, description, effort_days, due_date });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      console.error('Error Creating Task:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  
  

// Update an existing task
exports.updateTask = async (req, res) => {
  const { title, description, effort_days, due_date } = req.body;
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, effort_days, due_date },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export tasks to Excel (this is a simple example, you may want to use a library like xlsx)
const XLSX = require('xlsx');
const fs = require('fs');

exports.exportTasksToExcel = async (req, res) => {
  try {
    const tasks = await Task.find();

    // Prepare data for export
    const tasksData = tasks.map(task => ({
      Title: task.title,
      Description: task.description,
      'Effort (Days)': task.effort_days,
      'Due Date': task.due_date,
    }));

    // Create Excel file
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tasksData);
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');

    // Write Excel file to disk
    const filePath = 'tasks_export.xlsx';
    XLSX.writeFile(wb, filePath);

    res.download(filePath, 'tasks_export.xlsx', (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error exporting tasks to Excel' });
      }
      // Clean up the file after download
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error exporting tasks to Excel' });
  }
};
