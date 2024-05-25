const express = require("express")
const {registerUser, authUser, allUsers, updateExistingUsers, getUserById, validateUserRole} = require("../controllers/userController")

const router = express.Router()

router.route('/').post(registerUser).get(allUsers)
router.route('/:_id').get(getUserById).put(validateUserRole)
router.post('/login', authUser)

module.exports = router;