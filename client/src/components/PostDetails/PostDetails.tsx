import React, { useEffect } from 'react'
import styles from './ScssPostDetails.module.scss'
import useStyles from './materialStyles'
import moment from 'moment'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import {
  getCertainPostSelector,
  getFetchingPostsSelector
} from '../../selectors/postsSelectors'
import { CircularProgress, Divider, Paper, Typography } from '@material-ui/core'
import { getCertainPostThunk } from '../../actions/postsAction'
import RecommendationPosts from './RecommendationPosts/RecommendationPosts'
import Comment from './Comment/Comment'


type PostDetailsType = {}

const PostDetails: React.FC<PostDetailsType> = () => {
  const dispath = useAppDispatch()
  const classes = useStyles()
  const post = useAppSelector(getCertainPostSelector)
  const isLoading = useAppSelector(getFetchingPostsSelector)
  const { id } = useParams()


  useEffect(() => {
    dispath(getCertainPostThunk(id as string))
  }, [id])


  return (
    <>
      {isLoading
        ? <CircularProgress className={styles.progress}/>
        : <Paper className={styles.container} elevation={6}>
          <div className={classes.card}>
            <div className={styles.section}>
              <Typography variant="h3" component="h2">{post?.title}</Typography>
              <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((tag) => (
                <Link to={`/tags/${tag}`} key={tag} className={styles.tag}>
                  {` #${tag} `}
                </Link>
              ))}
              </Typography>
              <Typography className={styles.message} gutterBottom variant="body1"
                          component="p">{post?.message}
              </Typography>
              <Typography className={styles.creatBy} variant="h6">
                Created by:
                <Link to={`/creators/${post?.name}`} className={styles.name}>
                  {` ${post?.name}`}
                </Link>
              </Typography>
              <Typography className={styles.created} variant="body1">{moment(post?.createAt).fromNow()}</Typography>
              <Divider style={{ margin: '20px 0' }}/>
              <Comment post={post} />
            </div>
            <div className={classes.imageSection}>
              <img className={styles.media}
                   src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                   alt={post?.title}/>
            </div>
          </div>
        </Paper>
      }
      <RecommendationPosts post={post}/>
    </>
  )
}

export default PostDetails