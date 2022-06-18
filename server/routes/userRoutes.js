import express from 'express'
import { signin, signup, update } from '../controllers/userController.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/update', update)

export default router