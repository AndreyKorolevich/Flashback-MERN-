import React, { useEffect } from 'react'
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core'
import styles from './ScssRecommendationPosts.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getFetchingRelatedPostsSelector, getRelatedPostsSelector } from '../../../selectors/postsSelectors'
import { getPostsByTagsThunk, PostsResponseDataInterface } from '../../../actions/postsAction'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../Posts/Post/Post'

type RecommendationPostsType = {
  post: PostsResponseDataInterface | null
}

const RecommendationPosts: React.FC<RecommendationPostsType> = ({ post }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  const isFetchingRelatedPosts = useAppSelector(getFetchingRelatedPostsSelector)
  const relatedPosts = useAppSelector(getRelatedPostsSelector).filter((post) => post._id !== id)

  useEffect(() => {
    const tags = post?.tags.join(',')
    if (tags) {
      dispath(getPostsByTagsThunk(tags))
    }
  }, [post?.tags.join(',')])

  return (
    isFetchingRelatedPosts ? <CircularProgress className={styles.progress}/>
      : (<div className={styles.container}>
        <div className={styles.recomend}>
          <Typography className={styles.title} gutterBottom variant="h5">You might also like</Typography>
        </div>
        {relatedPosts.length > 0 &&
        <Grid container spacing={2}>
          {relatedPosts.map((post) => (
            <Grid key={post._id} item xs={6} sm={3} md={3} lg={2}>
              <Post {...post} showActions={false} showDetails={false}/>
            </Grid>
          ))}
        </Grid>}
      </div>)
  )
}

export default RecommendationPosts