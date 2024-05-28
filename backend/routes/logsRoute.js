const express = require('express');
const { createLog} = require('../controllers/logsController');
const router = express.Router();

// GET all discussions and POST a new discussion
router.route('/')
    
    .post(createLog);

module.exports = router;


