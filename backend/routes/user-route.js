const express = require('express')
const userController = require('../controller/user-controller')
const router = express.Router()

router.get('/users', userController.getUsers)


router.post('/login',userController.login)
router.post('/signup',userController.signup)


module.exports = router
