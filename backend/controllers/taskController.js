const asyncHandler = require("express-async-handler")
const Task = require("../models/taskModel")
const Project = require('../models/projectModel');

const getTasks = asyncHandler(async(req,res) =>{
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {     
    console.error(error);
    res.status(500).send('Server Error');
  }
}) 

const addTasks = asyncHandler(async (req, res) => {
  try {
    const { parentTaskId, id,owner, ...taskDetails } = req.body; // Destructure owner and get the rest of the fields

    // If owner is not provided or is an empty array, set it to an empty array
    const taskOwner = owner.length > 0 ? owner : [];

    // Create a new task instance with the appropriate owner
    const newTask = new Task({
      ...taskDetails,
      owner: taskOwner,
      id,
      parent:parentTaskId || null
    });

    await newTask.save();
    res.status(201).json(newTask); // Respond with the created task

  } catch (error) {
    console.error('Error creating task', error);
    res.status(500).send('Internal Server Error');
  }
})

const findTask = asyncHandler(async(req,res) => {
  try {
    const taskId = req.params._id;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error finding task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

const editTask = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params._id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update task properties based on the data sent in the request body
    // Assuming req.body contains the updated task data
    const updatedTaskData = req.body;

    // Update task properties individually
    // You may want to add more validation or error handling here
    if (updatedTaskData.name) {
      task.name = updatedTaskData.name;
    }
    if (updatedTaskData.start_date) {
      task.start_date = updatedTaskData.start_date;
    }
    if (updatedTaskData.end_date) {
      task.end_date = updatedTaskData.end_date;
    }
    if (updatedTaskData.duration) {
      task.duration = updatedTaskData.duration;
    }
    if (updatedTaskData.progress) {
      task.progress = updatedTaskData.progress;
    }

    if (updatedTaskData.owner) {
      task.owner = updatedTaskData.owner;
    }
    // Add more properties as needed

    // Save the updated task to the database
    await task.save();

    // Send a success response
    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports  = {getTasks, addTasks, findTask, editTask}  