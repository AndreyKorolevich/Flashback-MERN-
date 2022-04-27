import { PostDataType } from '../components/Form/Form'
import { RootStateType } from '../reducers/store'

export const getPostsSelector = (state: RootStateType) => state.postsReducer.posts
export const getFetchingPostsSelector = (state: RootStateType) => state.postsReducer.isFetchingPosts
export const getOpenedPostIdSelector = (state: RootStateType) => state.postsReducer.openedPostId
export const getOpenedPostSelector = (state: RootStateType): null | PostDataType => {
  const post = state.postsReducer.posts.find(post => post._id === state.postsReducer.openedPostId)
  if (post === undefined) {
    return null
  } else {
    return {
      creator: post.creator,
      title: post.title,
      message: post.message,
      tags: post.tags.join(','),
      selectedFile: post.selectedFile
    }
  }
}