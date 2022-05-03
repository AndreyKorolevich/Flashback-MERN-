import express from 'express'
import { getPosts, getPostsBySearch, createPosts, updatePost, deletePost, likePost } from '../controllers/postContoller.js'
import auth from '../middleware/authMiddleware.js'


const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/', getPosts)
router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router