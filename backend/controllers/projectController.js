const asyncHandler = require("express-async-handler")
const Project = require("../models/projectModel")
const Task = require("../models/taskModel")
const Discussion = require("../models/discussionModel")
const Comment = require("../models/commentModel")
const User = require("../models/userModel")

const createProject = asyncHandler(async (req, res) => {
  const {
    project_name,
    contract,
    contractor,
    funds,
    isOngoing,
    isCompleted,
    city, province, street,
    procuring_entity,
    status,
    projectDescription
  } = req.body;

  // Check if any of the required fields is missing
  if(!project_name || !contract || !contractor || !funds || !city || !province || !street || !procuring_entity || !projectDescription) {
    res.status(400);
    throw new Error("Please supply all the fields required");
  }

  const project = await Project.create({
    project_name,
    contract,
    contractor,
    funds,
    isOngoing,
    isCompleted,
    city, province, street,
    procuring_entity,
    status,
    projectDescription
  });

  if (project) {
    res.status(201).json({
      _id: project._id,
      project_name: project.project_name,
      contract: project.contract,
      contractor: project.contractor,
      funds: project.funds,
      isOngoing: false,
      isCompleted: false,
      city: project.city,
      province: project.province,
      street: project.street,
      procuring_entity: project.procuring_entity,
      status: project.status,
      projectDescription: project.projectDescription
    });
  } else {
    res.status(400);
    throw new Error("Failed to create project");
  }
});



const allProjects = asyncHandler(async(req,res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
      } catch (error) {     
        console.error(error);
        res.status(500).send('Server Error');
      }
})

const editProject = asyncHandler(async(req,res) => {

    const projectId = req.params._id;
    const userEdits = req.body;
    console.log(projectId)
    try {
        // Find the entry by ID and update dynamically
        const updatedEntry = await Project.findByIdAndUpdate(
          projectId,
          { $set: userEdits },
          { new: true } // Return the updated document
        );
    
        if (!updatedEntry) {
          return res.status(404).json({ error: 'Entry not found' });
        }
    
        res.json(updatedEntry);
      } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
      }
})

const addTask = asyncHandler(async (req, res) => {
  const projectId = req.params._id;
  const taskDetails = req.body; // Assuming the entire task details are in the request body

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Create a new task object
    const newTask = new Task(taskDetails);
    
    // Save the task to the database
    const savedTask = await newTask.save();

    // Add the task to the project's tasks array
    project.tasks.push(savedTask);

    // Save the updated project document
    const updatedProject = await project.save();
    
    res.status(201).json({ project: updatedProject, task: savedTask });
  } catch (error) {
    console.error('Error adding task to project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const findById = asyncHandler(async(req,res) =>{
  const projectId = req.params._id;
  const project = await Project.findById(projectId);

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
})

const getTasks = asyncHandler(async(req, res) => {
  try {
    // Fetch all projects
    const projects = await Project.find();

    // Array to store all tasks data
    const allTasks = [];
    
    // Fetch tasks for each project
    for (const project of projects) {
      // Find tasks by their IDs
      const tasks = await Task.find({ _id: { $in: project.tasks } });
      
      // Append the tasks to the allTasks array
      allTasks.push(...tasks);
    }

    res.json(allTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



const pauseProject = asyncHandler(async(req,res) => {

  try {
    const projectId = req.params._id;

    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Toggle the isPaused field
    project.isOngoing = !project.isOngoing;

    // Save the updated project document
    const updatedProject = await project.save();

    res.status(200).json({ isOngoing: updatedProject.isOngoing });
  } catch (error) {
    console.error('Error updating project status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

const getByStatus = asyncHandler(async(req, res) =>{
        const {status} = req.params;
        try {
          const projects = await Project.find({ status });
          res.json(projects);
        } catch (error) {
          res.status(500).json({ error: 'Internal Server Error' });
        }
      }
)
const activeProjects = asyncHandler(async(req,res) =>{

  try {
    const projects = await Project.find({ status: { $ne: 'Pending' } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }  
})

const tasksByProject = asyncHandler(async(req,res) =>{
  try {
    const projectId = req.params._id;

    // Check if the project exists
    const project = await Project.findById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Retrieve tasks for the specified project
    const tasks = project.tasks
    
    
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

const deleteTask = asyncHandler(async (req, res) => {
  const { projectId, taskId } = req.params;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the task reference ID exists in the project's list of tasks
    const taskIndex = project.tasks.indexOf(taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task reference ID not found in project' });
    }

    // Remove the task reference ID from the project's list of tasks
    project.tasks.splice(taskIndex, 1);
    await project.save();

    // Send a success response
    res.status(200).json({ message: 'Task reference ID deleted successfully from project' });
  } catch (error) {
    // Handle any errors
    console.error('Error deleting task reference ID from project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = {deleteTask,tasksByProject, createProject,findById, allProjects, editProject, addTask, getTasks, pauseProject, activeProjects, getByStatus}