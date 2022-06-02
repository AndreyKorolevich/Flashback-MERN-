import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  name: String,
  tags: [String],
  selectedFile: {
    type: [String],
    default: []
  },
  likes: {
    type: [String],
    default: []
  },
  comments: {
    type: [String],
    default: []
  },
  createAt:{
    type: Date,
    default: new Date()
  },
})

const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage