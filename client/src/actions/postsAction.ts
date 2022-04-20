import * as api from '../api'
import { FETCH_ALL } from '../reducers/postsReducer'
import { Action, AnyAction, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

export const getPostsActionCreator = (payload: any): AnyAction => {
  return {
    type: FETCH_ALL,
    payload: payload
  }
}

type DispatchType = Dispatch<Action>
type ThunkType = ThunkAction<Promise<string>, any, null, any>

export const getPostsThunk = () => async (dispatch: DispatchType): Promise<void> => {
  try {
    const { data } = await api.fetchPosts()
    dispatch(getPostsActionCreator(data))
  } catch (e) {
    console.log(e)
  }
}