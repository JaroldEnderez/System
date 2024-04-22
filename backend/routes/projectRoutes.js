const express = require("express")
const {allDiscussions, createDiscussion, allComments, createComment, createProject, allProjects, editProject, addTask,getTasks, findById, pauseProject, activeProjects , getByStatus,tasksByProject, deleteTask} = require("../controllers/projectController")
const router = express.Router()

router.route('/').post(createProject).get(allProjects)
router.route('/:_id').get(findById)
router.route('/edit/:_id').put(editProject)
router.route('/:_id/tasks').post(addTask).get(tasksByProject)
router.route('/tasks').get(getTasks)
router.route('/:_id/pause').put(pauseProject)
router.route('/Status/:status').get(getByStatus)
router.route('/exceptPending').get(activeProjects)
router.route('/:projectId/tasks/:taskId').delete(deleteTask)


module.exports = router