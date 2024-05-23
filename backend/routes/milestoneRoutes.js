const express = require('express');
const { createMilestone, getMilestonesByProject, updateMilestoneStatus} = require('../controllers/milestoneController');
const router = express.Router();

// GET all discussions and POST a new discussion
router.route('/')
    .post(createMilestone);
router.route('/from-project/:_id').get(getMilestonesByProject);
router.route('/:_id/status').put(updateMilestoneStatus);

module.exports = router;


