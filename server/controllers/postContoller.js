import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose'

export const getPosts = async (req, res) => {
  try {
    const postMessage = await PostMessage.find()

    res.status(200).json(postMessage)
  } catch (e) {
    res.status(404).json({ message: e.message })
  }
}

export const createPosts = async (req, res) => {
  const post = req.body
  const newPost = new PostMessage(post)
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