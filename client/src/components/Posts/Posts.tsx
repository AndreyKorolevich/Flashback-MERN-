import React, { useEffect } from 'react'
import styles from './ScssPosts.module.scss'
import { useAppSelector } from '../../hooks/hooks'
import Post from './Post/Post'
import { getFetchingPostsSelector, getPostsSelector } from '../../selectors/postsSelectors'
import { CircularProgress, Grid } from '@material-ui/core'

const Posts = () => {
  const posts = useAppSelector(getPostsSelector)
  const isFetchingPosts = useAppSelector(getFetchingPostsSelector)

  return (
    isFetchingPosts ? <CircularProgress className={styles.progress}/> : (
      <>
        {posts.map(post => (
          <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
            <Post {...post}/>
          </Grid>
        ))}
      </>
    )
  )
}

export default Posts