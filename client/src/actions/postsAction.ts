import * as api from '../api'
import { ActionTypes, ThunkType } from '../reducers/store'
import { PostDataType } from '../components/Form/Form'
import {
  CHANGE_OPENED_POST_ID,
  CREATE,
  FETCH_ALL,
  SET_FETCHING_FORM,
  SET_FETCHING_POSTS,
  UPDATE
} from '../reducers/postsReducer'



export const actionsPosts = {
  getPostsActionCreator: (payload: Array<PostsResponseDataType>) => ({
    type: FETCH_ALL,
    payload
  } as const),
  createActionCreator: (payload: PostsResponseDataType) => ({
    type: CREATE,
    payload
  } as const),
  updateActionCreator: (payload: PostsResponseDataType) => ({
    type: UPDATE,
    payload
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
  tags: Array<string>,
  selectedFile: string,
  likeCount: number,
  createAt: Date,
  __v: number
  _id: string
}

export const getPostsThunk = (): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingPosts(true))
    const { data } = await api.fetchPosts()
    dispatch(actionsPosts.getPostsActionCreator(data))
  } catch (e) {
    console.log(e)
  }finally {
    dispatch(actionsPosts.setFetchingPosts(false))
  }
}

export const createPostThunk = (post: PostDataType): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingForm(true))
    const { data } = await api.createPost(post)
    dispatch(actionsPosts.createActionCreator(data))
  } catch (e) {
    console.log(e)
  }finally {
    dispatch(actionsPosts.setFetchingForm(false))
  }
}

export const updatePostThunk = (id: string, post: PostDataType): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingForm(true))
    const { data } = await api.updatePost(id, post)
    dispatch(actionsPosts.updateActionCreator(data))
  } catch (e) {
    console.log(e)
  }finally {
    dispatch(actionsPosts.setFetchingForm(false))
  }
}
