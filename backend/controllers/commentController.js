const asyncHandler = require("express-async-handler")
const Comment = require("../models/commentModel")
const Discussion = require("../models/discussionModel")

const createComment = asyncHandler(async(req,res) => {
  const { content, author, discussionId } = req.body; // Add discussionId here
  
  const myDiscussion = await Discussion.findById(discussionId);
  
  if (!myDiscussion) {
    return res.status(404).json({ message: 'Discussion not found' });
  }
  try{
    const newComment =  new Comment({
      content,
      author,
      discussion: discussionId // Use discussionId here to associate comment with discussion
    });
    await newComment.save()
    console.log("Comment Saved")
    myDiscussion.comments.push(newComment);
    await myDiscussion.save();
    

  } catch (e){
    console.error('Error adding comment to discussion:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = {createComment}
