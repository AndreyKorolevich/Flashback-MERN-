import React, { useEffect } from 'react'
import { CircularProgress, Paper, Typography } from '@material-ui/core'
import styles from './ScssRecommendationPosts.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getFetchingRelatedPostsSelector, getRelatedPostsSelector } from '../../../selectors/postsSelectors'
import { getPostsByTagsThunk, PostsResponseDataType } from '../../../actions/postsAction'
import { useNavigate, useParams } from 'react-router-dom'
import useStyles from '../materialStyles'

type RecommendationPostsType = {
  post: PostsResponseDataType | null
}

const RecommendationPosts: React.FC<RecommendationPostsType> = ({ post }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  const classes = useStyles()
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
    <div className={styles.container}>
      <Paper className={styles.recomend} elevation={3}>
        <Typography gutterBottom variant="h5">You might also like:</Typography>
      </Paper>
      {isFetchingRelatedPosts ? <CircularProgress className={styles.progress}/>
        : <> {relatedPosts.length > 0 && <div className={styles.section}>
          <div className={classes.recommendedPosts}>
            {relatedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={onOpenPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} width="200px"/>
              </div>
            ))}
          </div>
        </div>
        }
        </>
      }
    </div>
  )
}

export default RecommendationPosts