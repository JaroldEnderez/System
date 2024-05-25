const asyncHandler = require("express-async-handler")
const Milestone = require("../models/milestoneModel")
const Project = require("../models/projectModel")

const createMilestone = asyncHandler(async (req, res) => {
    // Extract milestone data from request body
    const { name, description, dueDate, project, dependencies } = req.body;
    
    try {
      // Create a new milestone document
      const milestone = new Milestone({
        name,
        description,
        dueDate,
        project,
        dependencies
      });
  
      // Save the milestone document to the database
      await milestone.save();
      await Project.findByIdAndUpdate(project, { $push: { milestones: milestone._id } });

      console.log("Milestone created: ", milestone)
      // Respond with the newly created milestone
      res.status(201).json({ milestone });
    } catch (error) {
      // Handle any errors that occur during milestone creation
      console.error('Error creating milestone:', error);
      res.status(500).json({ error: 'Failed to create milestone' });
    }
  })

  const getMilestonesByProject = asyncHandler(async (req, res) => {
    // Extract the project ID from the request parameters
    const projectId = req.params._id;
  
    // Fetch milestones by project ID from the database
    const milestones = await Milestone.find({ project: projectId });
  
    // Respond with the list of milestones
    res.json( milestones );
  });

  const updateMilestoneStatus = asyncHandler(async (req, res) => {
    // Extract milestone ID and new status from request body

    const id = req.params._id;

    try {
      // Find the milestone by ID and update its status
      const milestone = await Milestone.findByIdAndUpdate(
        id,
        {status: 'delayed'},
        { new: true } // Return the updated milestone after the update
      );
  
      if (!milestone) {
        return res.status(404).json({ error: 'Milestone not found' });
      }
  
      // Respond with the updated milestone
      res.json({ milestone });
    } catch (error) {
      console.error('Error updating milestone status:', error);
      res.status(500).json({ error: 'Failed to update milestone status' });
    }
  });

module.exports = {createMilestone, getMilestonesByProject, updateMilestoneStatus}
