const asyncHandler = require("express-async-handler")
const Project = require("../models/projectModel")


const createProject = asyncHandler(async(req,res) => {
    const {project_name,contract,contractor,funds,isOngoing,isCompleted,location,procuring_entity, status} = req.body

    if(!project_name || !contract || !contractor || !funds || !location || !procuring_entity){
        res.status(400)
        throw new Error("Please supply all the fields required")
    }

    const project = await Project.create({
        project_name,
        contract,
        contractor,
        funds,
        isOngoing,
        isCompleted,
        location,
        procuring_entity,
        status
    })

    if(project){
        res.status(201).json({
            _id: project._id,
            project_name: project.project_name,
            contract: project.contract,
            contractor: project.contractor,
            funds: project.funds,
            isOngoing: false,
            isCompleted: false,
            location: project.location,
            procuring_entity:project.procuring_entity,
            status: project.status
        })
    }else{
        res.status(400)
        throw new Error("Failed to create project")
    }
})

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

const addTask = asyncHandler(async(req,res) => {
    try {
        const projectId = req.params._id;
        const {title, description, startDate, endDate } = req.body;
    
        // Find the project by ID
        const project = await Project.findById(projectId);
        
        if (!project) {
          return res.status(404).json({ error: 'Project not found' });
        }
        
        // Add a new task to the project's tasks array
        project.tasks.push({ title, description, startDate, endDate });
    
        // Save the updated project document
        const updatedProject = await project.save();
    
        res.status(201).json(updatedProject);
      } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

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
const byStatus = asyncHandler(async(req,res) =>{

  try {
    const projects = await Project.find({ status: "pending"});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

const byPaused = asyncHandler(async(req,res) =>{

  try {
    const projects = await Project.find({ status: "paused"});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



module.exports = {createProject, allProjects, editProject, addTask, pauseProject, byStatus, byPaused, getByStatus}