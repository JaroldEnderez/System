const express = require('express');
<<<<<<< HEAD
const { getDiscussions, createDiscussion, findDiscussion, getComments  } = require('../controllers/discussionController');
=======
const { getDiscussions, createDiscussion, findDiscussion, getComments, getDiscussionsByProjectId  } = require('../controllers/discussionController');
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
const router = express.Router();

// GET all discussions and POST a new discussion
router.route('/')
    .get(getDiscussions)
    .post(createDiscussion);

router.route('/:_id').get(findDiscussion)
router.route('/:_id/comments').get(getComments)
<<<<<<< HEAD

=======
router.route('/project/:_id').get(getDiscussionsByProjectId)
>>>>>>> 7d351daea0ed1c782b362561355a503e28183acf
module.exports = router;
