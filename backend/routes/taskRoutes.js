const express = require("express")
const {getTasks, addTasks, findTask, editTask} = require("../controllers/taskController")
const router = express.Router()

router.route('/').post(addTasks).get(getTasks)
router.route('/:_id').get(findTask).put(editTask)

module.exports = router