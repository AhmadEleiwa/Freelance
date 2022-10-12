const express = require('express')
const tagController = require('../controller/tags-controller')

const router = express.Router()



router.get('/tags',tagController.getTags)


module.exports = router