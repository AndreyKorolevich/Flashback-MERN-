import React, { useEffect } from 'react'
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core'
import styles from './ScssRecommendationPosts.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getFetchingRelatedPostsSelector, getRelatedPostsSelector } from '../../../selectors/postsSelectors'
import { getPostsByTagsThunk, PostsResponseDataInterface } from '../../../actions/postsAction'
import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../Posts/Post/Post'
import Posts from '../../Posts/Posts'

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
  }, [post?.tags])

  const onOpenPost = (_id: string) => () => {
    navigate(`/posts/${_id}`)
  }

  return (
    isFetchingRelatedPosts ? <CircularProgress className={styles.progress}/>
      : (<div className={styles.container}>
        <Paper className={styles.recomend} elevation={3}>
          <Typography gutterBottom variant="h6">You might also like</Typography>
        </Paper>
        {relatedPosts.length > 0 &&
        <Grid container spacing={2}>
          {relatedPosts.map((post) => (
            <Grid onClick={onOpenPost(post._id)} key={post._id} item xs={6} sm={3} md={3} lg={2}>
              <Post {...post} showActions={false} showDetails={false}/>
            </Grid>
          ))}
        </Grid>}
      </div>)
  )
}

export default RecommendationPosts