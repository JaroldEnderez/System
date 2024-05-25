const express = require('express');
const { createComment} = require('../controllers/commentController');
const router = express.Router();

// GET all discussions and POST a new discussion
router.route('/')
    
    .post(createComment);

module.exports = router;


