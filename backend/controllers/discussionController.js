const asyncHandler = require("express-async-handler")
const Discussion = require("../models/discussionModel")
const Comment = require("../models/commentModel")

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
  const discussionId = req.params._id;

  try {
    // Fetch comments for the discussion from the database
    const comments = await Comment.find({ discussion: discussionId }).populate('author', 'name');

    // Construct the response payload with comments and user information
    const commentsWithUserInfo = comments.map(comment => ({
        _id: comment._id,
        content: comment.content,
        author: {
            _id: comment.author._id,
            name: comment.author.name
        },
        dateCreated: comment.dateCreated
    }));

    // Send the combined data as the API response
    res.json(commentsWithUserInfo);
} catch (error) {
    console.error("Error fetching comments and user information: ", error);
    res.status(500).json({ error: "Internal server error" });
}
});




module.exports = {getDiscussions, createDiscussion, findDiscussion, getComments}
