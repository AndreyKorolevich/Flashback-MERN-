import * as api from '../api'
import { ActionTypes, ThunkType } from '../reducers/store'
import { PostFormDataInterface } from '../components/Form/Form'
import {
  CHANGE_OPENED_POST_ID,
  CREATE,
  DELETE,
  FETCH_POSTS,
  SET_FETCHING_FORM,
  SET_FETCHING_POSTS,
  UPDATE
} from '../reducers/postsReducer'
import { updateTagsType } from '../utils/updateTagsType'


export const actionsPosts = {
  setPostsActionCreator: (payload: Array<PostsResponseDataType>) => ({
    type: FETCH_POSTS,
    payload
  } as const),
  createPostActionCreator: (payload: PostsResponseDataType) => ({
    type: CREATE,
    payload
  } as const),
  updatePostActionCreator: (payload: PostsResponseDataType) => ({
    type: UPDATE,
    payload
  } as const),
  deletePostActionCreator: (id: string) => ({
    type: DELETE,
    id
  } as const),
  changeOpenedPostIdActionCreator: (payload: string | null) => ({
    type: CHANGE_OPENED_POST_ID,
    payload
  } as const),
  setFetchingPosts: (flag: boolean) => ({
    type: SET_FETCHING_POSTS,
    flag
  } as const),
  setFetchingForm: (flag: boolean) => ({
    type: SET_FETCHING_FORM,
    flag
  } as const)
}

export type PostsActionType = ActionTypes<typeof actionsPosts>

export type PostsResponseDataType = {
  title: string,
  message: string,
  creator: string,
  name: string,
  tags: Array<string>,
  selectedFile: string,
  likes: Array<string>,
  createAt: Date,
  __v: number
  _id: string
}

export interface PostDataInterface extends PostFormDataInterface{
  name: string | undefined
}

export const getPostsThunk = (): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingPosts(true))
    const { data } = await api.fetchPosts()
    dispatch(actionsPosts.setPostsActionCreator(data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingPosts(false))
  }
}

export const getPostsBySearchThunk = (searchQuery: string): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingPosts(true))
    const { data } = await api.fetchPostsBySearch(searchQuery)
    dispatch(actionsPosts.setPostsActionCreator(data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingPosts(false))
  }
}


export const createPostThunk = (post: PostDataInterface): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingForm(true))
    post.tags = updateTagsType(post.tags)
    const { data } = await api.createPost(post)
    dispatch(actionsPosts.createPostActionCreator(data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingForm(false))
  }
}

export const updatePostThunk = (id: string, post: PostDataInterface): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingForm(true))
    post.tags = updateTagsType(post.tags)
    const { data } = await api.updatePost(id, post)
    dispatch(actionsPosts.updatePostActionCreator(data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingForm(false))
  }
}

export const deletePostThunk = (id: string): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    //dispatch(actionsPosts.setFetchingForm(true))
    await api.deletePost(id)
    dispatch(actionsPosts.deletePostActionCreator(id))
  } catch (e) {
    console.log(e)
  } finally {
    //dispatch(actionsPosts.setFetchingForm(false))
  }
}

export const likePostThunk = (id: string): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    //dispatch(actionsPosts.setFetchingForm(true))
    const { data } = await api.likePost(id)
    dispatch(actionsPosts.updatePostActionCreator(data))
  } catch (e) {
    console.log(e)
  } finally {
    //dispatch(actionsPosts.setFetchingForm(false))
  }
}
