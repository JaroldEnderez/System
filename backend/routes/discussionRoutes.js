const express = require('express');
const { getDiscussions, createDiscussion, findDiscussion, getComments  } = require('../controllers/discussionController');
const router = express.Router();

// GET all discussions and POST a new discussion
router.route('/')
    .get(getDiscussions)
    .post(createDiscussion);

router.route('/:_id').get(findDiscussion)
router.route('/:_id/comments').get(getComments)

module.exports = router;
