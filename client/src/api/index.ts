import axios from 'axios'
import { AuthFormStateType } from '../components/Auth/Auth'
import { AUTH_DATA } from '../constants'
import { PostDataInterface } from '../actions/postsAction'

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) =>{
  const authData = localStorage.getItem(AUTH_DATA)
  const headers = req.headers
  if(authData && headers) {
    headers.Authorization = `Bearer ${JSON.parse(authData).token}`
  }

  return req
})

export const fetchPosts = () => API.get('/posts')
export const fetchPostsBySearch = (searchQuery: string) => API.get(`/posts/search?searchQuery=${searchQuery || 'none'}`)
export const createPost = (newPost: PostDataInterface) => API.post('/posts', newPost)
export const updatePost = (id: string, updatePost: PostDataInterface) => API.patch(`${'/posts'}/${id}`, updatePost)
export const deletePost = (id: string) => API.delete(`${'/posts'}/${id}`)
export const likePost = (id: string) => API.patch(`${'/posts'}/${id}/likePost`)


export const signIn = (formData: AuthFormStateType) => API.post('/user/signin',  formData)
export const signUn = (formData: AuthFormStateType) => API.post('/user/signup',  formData)