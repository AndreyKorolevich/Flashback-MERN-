import { PostsActionType, PostsResponseDataType } from '../actions/postsAction'

export const FETCH_ALL = 'FETCH_ALL'
export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const CHANGE_OPENED_POST_ID = 'CHANGE_OPENED_POST_ID'
export const SET_FETCHING_POSTS = 'SET_FETCHING_POSTS'
export const SET_FETCHING_FORM = 'SET_FETCHING_FORM'


const initialState = {
  posts: [],
  isFetchingPosts: false,
  isFetchingForm: false,
  openedPostId: null
}
type PostsStateType = {
  posts: Array<PostsResponseDataType>
  isFetchingPosts: boolean
  isFetchingForm: boolean
  openedPostId: null | string
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
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload
          return post
        })
      }
    case CHANGE_OPENED_POST_ID:
      return {
        ...state,
        openedPostId: action.payload
      }
    case SET_FETCHING_POSTS:
      return {
        ...state,
        isFetchingPosts: action.flag
      }
    case SET_FETCHING_FORM:
      return {
        ...state,
        isFetchingForm: action.flag
      }
    default:
      return state
  }
}