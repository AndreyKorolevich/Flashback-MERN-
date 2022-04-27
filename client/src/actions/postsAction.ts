import * as api from '../api'
import { CREATE, FETCH_ALL } from '../reducers/postsReducer'
import { ActionTypes, ThunkType } from '../reducers/store'
import { PostDataType } from '../components/Form/Form'


export const actions = {
  getPostsActionCreator: (payload: Array<PostsResponseDataType>) => ({
    type: FETCH_ALL,
    payload: payload
  } as const),
  createActionCreator: (payload: PostsResponseDataType) => ({
    type: CREATE,
    payload: payload
  } as const)
}

export type PostsActionType = ActionTypes<typeof actions>

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
    const { data } = await api.fetchPosts()
    dispatch(actions.getPostsActionCreator(data))
  } catch (e) {
    console.log(e)
  }
}

export const createPostThunk = (post: PostDataType): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    const { data } = await api.createPost(post)
    dispatch(actions.createActionCreator(data))
  } catch (e) {
    console.log(e)
  }
}
