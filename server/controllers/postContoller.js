import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'
import { LIMIT_CARDS_ON_PAGE } from '../constants.js'

export const getPosts = async (req, res) => {
  const { page } = req.body
  try {
    const startIndex = (Number(page) - 1) * LIMIT_CARDS_ON_PAGE
    const total = await PostMessage.countDocuments({})
    const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT_CARDS_ON_PAGE).skip(startIndex)

    res.status(200).json({ posts, numberOfPages: Math.ceil(total / LIMIT_CARDS_ON_PAGE) })
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
}

export const getCertainPost = async (req, res) => {
  const { id } = req.params
  try {
    const post = await PostMessage.findById(id)

    res.status(200).json(post)
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query
  const { page } = req.body
  try {
    const search = new RegExp(searchQuery, 'i')
    const startIndex = (Number(page) - 1) * LIMIT_CARDS_ON_PAGE

    const total = await PostMessage.countDocuments().or([{ title: search }, { tags: search }, { message: search }])
    const posts = await PostMessage
      .find()
      .or([{ title: search }, { tags: search }, { message: search }])
      .sort({ _id: -1 })
      .limit(LIMIT_CARDS_ON_PAGE)
      .skip(startIndex)

    res.status(200).json({ posts, numberOfPages: Math.ceil(total / LIMIT_CARDS_ON_PAGE) })
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
}

export const getPostsByTags = async (req, res) => {
  const { searchQuery } = req.query
  try {
    const posts = await PostMessage.find({ tags: { $in: searchQuery.split(',') } }).limit(LIMIT_CARDS_ON_PAGE)

    res.status(200).json(posts)
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
}

export const createPosts = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (e) {
    res.status(409).json({ message: e.message })
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const updatePost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true })

    res.status(201).json(updatePost)
  } catch (e) {
    res.status(409).json({ message: e.message })
  }
}

export const deletePost = async (req, res) => {
  const { id: _id } = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    await PostMessage.findByIdAndRemove(_id)

    res.json({ message: 'Post deleted successfully' })
  } catch (e) {
    res.status(409).json({ message: e.message })
  }
}

export const likePost = async (req, res) => {
  const { id: _id } = req.params

  if (!req.userId) {
    return res.json({ message: 'Unauthenticated' })
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')

    const post = await PostMessage.findById(_id)

    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
      post.likes.push(req.userId)
    } else {
      post.likes = post.likes.filter(id => id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true })

    res.status(201).json(updatedPost)
  } catch (e) {
    res.status(409).json({ message: e.message })
  }
}