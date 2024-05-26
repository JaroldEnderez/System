const express = require('express');
const { getDiscussions, createDiscussion, findDiscussion, getComments, getDiscussionsByProjectId  } = require('../controllers/discussionController');
const router = express.Router();

// GET all discussions and POST a new discussion
router.route('/')
    .get(getDiscussions)
    .post(createDiscussion);

router.route('/:_id').get(findDiscussion)
router.route('/:_id/comments').get(getComments)
router.route('/project/:_id').get(getDiscussionsByProjectId)
module.exports = router;
