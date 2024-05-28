const asyncHandler = require("express-async-handler")
const Logs = require("../models/commentModel")
const Project = require("../models/projectModel")


const createLog = asyncHandler(async(req,res) => {
  const { content, author, projectId } = req.body; // Add discussionId here
  
  const project = await Project.findById(projectId);
  
  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }
  try{
    const newLogs =  new Logs({
      content,
      author,
      projectId // Use discussionId here to associate comment with discussion
    });
    await newLogs.save()
    console.log("Log Saved: ", content, " by", author)
    project.logs.push(newLogs);
    await project.save();
    

  } catch (e){
    console.error('Error adding log to project:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = {createLog}
