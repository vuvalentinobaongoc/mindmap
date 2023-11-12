import express from 'express'
import login from './access/login'

const router = express.Router()

router.use('/login', login)

export default router