import axios from 'axios'
import { PostDataType } from '../components/Form/Form'

const url = 'http://localhost:5000/posts'

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost: PostDataType) => axios.post(url, newPost)
export const updatePost = (id: string, updatePost: PostDataType) => axios.patch(`${url}/${id}`, updatePost)