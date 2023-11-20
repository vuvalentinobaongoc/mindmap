import express from 'express'
import login from './access/login'
import news from './news/news'
import nodes from './nodes/node'
const router = express.Router()

router.use('/login', login)
router.use('/news', news)
router.use('/nodes', nodes)

export default router
