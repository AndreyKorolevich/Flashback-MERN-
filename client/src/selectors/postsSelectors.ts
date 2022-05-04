import { PostFormDataInterface } from '../components/Form/Form'
import { RootStateType } from '../reducers/store'
import { UserType } from '../actions/authAction'

export const getPostsSelector = (state: RootStateType) => state.postsReducer.posts
export const getNumberOfPagesSelector = (state: RootStateType) => state.postsReducer.numberOfPages
export const getFetchingPostsSelector = (state: RootStateType) => state.postsReducer.isFetchingPosts
export const getOpenedPostIdSelector = (state: RootStateType) => state.postsReducer.openedPostId
export const getOpenedPostSelector = (state: RootStateType): null | PostFormDataInterface => {
  const post = state.postsReducer.posts.find(post => post._id === state.postsReducer.openedPostId)
  if (post === undefined) {
    return null
  } else {
    return {
      title: post.title,
      message: post.message,
      tags: post.tags.join(','),
      selectedFile: post.selectedFile
    }
  }
}

export const getUserDataSelector = (state: RootStateType): UserType | null => state.authReducer?.user
export const getTokenSelector = (state: RootStateType): string | null => state.authReducer?.token