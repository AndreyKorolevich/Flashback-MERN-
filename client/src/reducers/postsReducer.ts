import { PostsActionType, PostsResponseDataType } from '../actions/postsAction'

export const FETCH_ALL = 'FETCH_ALL'
export const CREATE = 'CREATE'

const initialState = {
  posts: []
}
type PostsStateType = {
  posts: Array<PostsResponseDataType>
}

export default (state: PostsStateType = initialState, action: PostsActionType) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload
      }
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    default:
      return state
  }
}