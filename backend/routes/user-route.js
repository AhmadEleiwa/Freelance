const express = require('express')
const userController = require('../controller/user-controller')
const router = express.Router()
const fileUpload = require('../middleware/file-upload')

router.get('/users', userController.getUsers)

router.get('/:uid', userController.getUser)


router.post('/validate-email', userController.checkEmail)
router.post('/login',userController.login)
router.post('/signup',fileUpload.profileImageUpload.single('image'),userController.signup)


module.exports = router
