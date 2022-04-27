import { RootStateType } from '../reducers/store'

export const getPostsSelector = (state: RootStateType) => state.postsReducer.posts