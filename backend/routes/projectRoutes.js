const express = require("express")
const {createProject, allProjects, editProject, addTask, pauseProject, byStatus, byPaused, getByStatus} = require("../controllers/projectController")
const router = express.Router()

router.route('/').post(createProject).get(allProjects)
router.route('/edit/:_id').put(editProject)
router.route('/:_id/tasks').post(addTask)
router.route('/:_id/pause').put(pauseProject)
router.route('/Status/:status').get(getByStatus)
router.route('/pending').get(byStatus)
router.route('/paused').get(byPaused)

module.exports = router