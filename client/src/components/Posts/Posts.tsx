import React from 'react'
import {useAppSelector} from '../../hooks/hooks'
import styles from './ScssPosts.module.scss'
import Post from './Post/Post'
import { getPostsSelector } from '../../selectors/postsSelectors'



const Posts = () => {
  const posts = useAppSelector(getPostsSelector)
  console.log(posts)
  return (
    <>
      <h1>Posts</h1>
      <Post/>
      <Post/>
    </>
  )
}

export default Posts