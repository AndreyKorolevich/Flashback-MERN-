import * as api from '../api'
import { ActionTypes, ThunkType } from '../reducers/store'
import { PostFormDataInterface, SelectedFileType } from '../components/Form/Form'
import {
  CHANGE_OPENED_POST_ID,
  COMMENTS,
  CREATE,
  DELETE,
  FETCH_POSTS,
  SET_FETCHING_FORM,
  SET_FETCHING_POSTS,
  SET_FETCHING_RELATED_POSTS,
  SET_POST,
  SET_RELATED_POST,
  UPDATE
} from '../reducers/postsReducer'
import { updateTagsType } from '../utils/updateTagsType'


export const actionsPosts = {
  setPostsActionCreator: (posts: Array<PostsResponseDataInterface>, numberOfPages: number) => ({
    type: FETCH_POSTS,
    payload: {
      posts,
      numberOfPages
    }
  } as const),
  setCertainPostActionCreator: (post: PostsResponseDataInterface) => ({
    type: SET_POST,
    payload: {
      post
    }
  } as const),
  setRelatedPostsActionCreator: (posts: Array<PostsResponseDataInterface>) => ({
    type: SET_RELATED_POST,
    payload: {
      posts
    }
  } as const),
  createPostActionCreator: (payload: PostsResponseDataInterface) => ({
    type: CREATE,
    payload
  } as const),
  updatePostActionCreator: (payload: PostsResponseDataInterface) => ({
    type: UPDATE,
    payload
  } as const),
  updateCommentsActionCreator: (payload: PostsResponseDataInterface) => ({
    type: COMMENTS,
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
  } as const),
  setFetchingRelatedPosts: (flag: boolean) => ({
    type: SET_FETCHING_RELATED_POSTS,
    flag
  } as const)
}

export type PostsActionType = ActionTypes<typeof actionsPosts>

export interface PostsResponseDataInterface {
  title: string,
  message: string,
  creator: string,
  name: string,
  tags: Array<string>,
  selectedFile: SelectedFileType,
  likes: Array<string>,
  createAt: Date,
  comments: Array<string>
  __v: number
  _id: string
}

export interface PostDataInterface extends PostFormDataInterface {
  name: string | undefined
}

export const getCertainPostThunk = (id: string): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingPosts(true))
    const { data } = await api.fetchCertainPost(id)
    dispatch(actionsPosts.setCertainPostActionCreator(data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingPosts(false))
  }
}

export const getPostsThunk = (page: number): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingPosts(true))
    const { data } = await api.fetchPosts(page)
    dispatch(actionsPosts.setPostsActionCreator(data.posts, data.numberOfPages))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingPosts(false))
  }
}

export const getPostsBySearchThunk = (searchQuery: string, page: number): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingPosts(true))
    const { data } = await api.fetchPostsBySearch(searchQuery, page)
    dispatch(actionsPosts.setPostsActionCreator(data.posts, data.numberOfPages))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingPosts(false))
  }
}

export const getPostsByTagsThunk = (tags: string): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    dispatch(actionsPosts.setFetchingRelatedPosts(true))
    const { data } = await api.fetchPostsByTags(tags)
    dispatch(actionsPosts.setRelatedPostsActionCreator(data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(actionsPosts.setFetchingRelatedPosts(false))
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

export const commentPostThunk = (value: string, id: string | undefined): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    //dispatch(actionsPosts.setFetchingForm(true))
    const { data } = await api.comment(value, id)
    dispatch(actionsPosts.updateCommentsActionCreator(data))
  } catch (e) {
    console.log(e)
  } finally {
    //dispatch(actionsPosts.setFetchingForm(false))
  }
}
