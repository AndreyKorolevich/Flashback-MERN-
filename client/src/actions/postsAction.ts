import * as api from '../api'
import { FETCH_ALL } from '../reducers/postsReducer'
import { ActionTypes, ThunkType } from '../reducers/store'


export const actions = {
  getPostsActionCreator: (payload: string) => ({
    type: FETCH_ALL,
    payload: payload
  } as const)
}

export type PostsActionType = ActionTypes<typeof actions>

export const getPostsThunk = (): ThunkType<PostsActionType> => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts()
    dispatch(actions.getPostsActionCreator(data))
  } catch (e) {
    console.log(e)
  }
}