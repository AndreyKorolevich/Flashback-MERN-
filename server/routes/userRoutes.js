import express from 'express'
import { signin, signup, update, googleSign, updateUserImage } from '../controllers/userController.js'

const router = express.Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/update', update)
router.post('/google', googleSign)
router.post('/image', updateUserImage)

export default router