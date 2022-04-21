import { PostsActionType } from '../actions/postsAction'

export const FETCH_ALL = 'FETCH_ALL'

const initialState = {}
type PostsStateType = typeof initialState

export default (state: PostsStateType = initialState, action: PostsActionType) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload
    default:
      return state
  }
}