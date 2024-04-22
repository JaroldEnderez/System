const asyncHandler = require("express-async-handler")
const Discussion = require("../models/discussionModel")

const getDiscussions = asyncHandler(async (req, res) => {
    try {
        const discussions = await Discussion.find();
        res.json(discussions);
      } catch (error) {     
        console.error(error);
        res.status(500).send('Server Error');
      }
})

const createDiscussion = asyncHandler(async(req,res) => {
    const { projectId, content, author } = req.body;
    const newDiscussion = new Discussion({
      projectId,
      content,
      author,
      comments: []
  });
    await newDiscussion.save()
    res.status(201).json(newDiscussion);
})

const findDiscussion = asyncHandler(async (req, res) => {
    try {
      const discussion = await Discussion.findById(req.params._id);
      if (!discussion) {
          return res.status(404).json({ message: 'Discussion not found' });
      }
      res.json(discussion);
  } catch (error) {
      console.error('Error fetching discussion by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

const getComments = asyncHandler(async (req, res) => {
  const discussionId = req.params._id

  try {
    const discussion = await Discussion.findById(discussionId)

    const allComments = []
    const comments = await Comment.find({ _id: { $in: discussion.comments } });
      
      // Append the tasks to the allTasks array
      allComments.push(...comments);
      res.json(allTasks);
    }catch(error){
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = {getDiscussions, createDiscussion, findDiscussion, getComments}
