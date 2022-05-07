import express from 'express'
import { getPosts, getPostsByTags, getCertainPost, getPostsBySearch, createPosts, updatePost, deletePost, likePost } from '../controllers/postContoller.js'
import auth from '../middleware/authMiddleware.js'


const router = express.Router()

router.get('/search', getPostsBySearch)
router.get('/tags', getPostsByTags)
router.get('/', getPosts)
router.get('/:id', getCertainPost)
router.post('/', auth, createPosts)
router.patch('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)
router.patch('/:id/likePost', auth, likePost)

export default router