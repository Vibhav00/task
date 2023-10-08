const express = require('express')
const { getResult, findRes } = require('./controller')
const router = express.Router()
router.route('/api/blog-stats').get(getResult)
router.route('/api/blog-search').get(findRes)
module.exports = router
