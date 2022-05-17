import { PostsActionType, PostsResponseDataInterface } from '../actions/postsAction'

export const FETCH_POSTS = 'FETCH_POSTS'
export const CREATE = 'CREATE'
export const UPDATE = 'UPDATE'
export const COMMENTS = 'COMMENTS'
export const DELETE = 'DELETE'
export const SET_POST = 'SET_POST'
export const CHANGE_OPENED_POST_ID = 'CHANGE_OPENED_POST_ID'
export const SET_FETCHING_POSTS = 'SET_FETCHING_POSTS'
export const SET_RELATED_POST = 'SET_RELATED_POST'
export const SET_FETCHING_FORM = 'SET_FETCHING_FORM'
export const SET_FETCHING_RELATED_POSTS = 'SET_FETCHING_RELATED_POSTS'


const initialState = {
  posts: [],
  relatedPosts: [],
  post: null,
  isFetchingPosts: false,
  isFetchingForm: false,
  isFetchingRelatedPosts: true,
  openedPostId: null,
  numberOfPages: 3
}
type PostsStateType = {
  posts: Array<PostsResponseDataInterface>
  relatedPosts: Array<PostsResponseDataInterface>
  post: PostsResponseDataInterface | null
  isFetchingPosts: boolean
  isFetchingForm: boolean
  isFetchingRelatedPosts: boolean
  numberOfPages: number
  openedPostId: null | string
}

export default (state: PostsStateType = initialState, action: PostsActionType) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        numberOfPages: action.payload.numberOfPages
      }
    case SET_POST:
      return {
        ...state,
        post: action.payload.post
      }
    case SET_RELATED_POST:
      return {
        ...state,
        relatedPosts: action.payload.posts
      }
    case CREATE:
      return {
        ...state,
        posts: [...state.posts, action.payload]
      }
    case COMMENTS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post._id === action.payload._id) return action.payload
          return post
        }),
        post: action.payload
      }
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload
          return post
        })
      }
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.id)
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
    case SET_FETCHING_RELATED_POSTS:
      return {
        ...state,
        isFetchingRelatedPosts: action.flag
      }
    default:
      return state
  }
}