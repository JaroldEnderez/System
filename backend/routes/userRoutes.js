const express = require("express")
const {registerUser, authUser, allUsers, updateExistingUsers, getUserById} = require("../controllers/userController")

const router = express.Router()

router.route('/').post(registerUser).get(allUsers)
router.route('/:_id').get(getUserById)
router.post('/login', authUser)
router.route('/editRoles').put(updateExistingUsers)

module.exports = router;