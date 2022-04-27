import React, { useEffect } from 'react'
import styles from './ScssPosts.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import Post from './Post/Post'
import { getFetchingPostsSelector, getPostsSelector } from '../../selectors/postsSelectors'
import { CircularProgress, Grid } from '@material-ui/core'
import { getPostsThunk } from '../../actions/postsAction'


const Posts = () => {
  const posts = useAppSelector(getPostsSelector)
  const isFetchingPosts = useAppSelector(getFetchingPostsSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPostsThunk())
  }, [dispatch])

  console.log(posts)
  return (
    isFetchingPosts ? <CircularProgress className={styles.progress}/> : (
      <Grid className={styles.container} container alignItems={'stretch'} spacing={3}>
        {posts.map(post => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post {...post}/>
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts