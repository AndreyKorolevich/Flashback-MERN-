import React, { useEffect } from 'react'
import styles from './ScssPostDetails.module.scss'
import { useParams, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getCertainPostSelector, getFetchingPostsSelector, getPostsSelector } from '../../selectors/postsSelectors'
import { CircularProgress, Divider, Paper, Typography } from '@material-ui/core'
import moment from 'moment'
import { getCertainPostThunk } from '../../actions/postsAction'


type PostDetailsType = {}

const PostDetails: React.FC<PostDetailsType> = () => {
  const dispath = useAppDispatch()
  const posts = useAppSelector(getPostsSelector)
  const post = useAppSelector(getCertainPostSelector)
  const isLoading = useAppSelector(getFetchingPostsSelector)
  const { id } = useParams()

  useEffect(() => {
    dispath(getCertainPostThunk(id as string))
  }, [id])

  return (
    isLoading ? <CircularProgress className={styles.progress}/> : (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={styles.card}>
          <div className={styles.section}>
            <Typography variant="h3" component="h2">{post?.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((tag) => (
              <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                {` #${tag} `}
              </Link>
            ))}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
            <Typography variant="h6">
              Created by:
              <Link to={`/creators/${post?.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                {` ${post?.name}`}
              </Link>
            </Typography>
            <Typography variant="body1">{moment(post?.createAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }}/>
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }}/>
            <Divider style={{ margin: '20px 0' }}/>
          </div>
          <div className={styles.imageSection}>
            <img className={styles.media}
                 src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
                 alt={post?.title}/>
          </div>
        </div>
      </Paper>
    )
  )
}

export default PostDetails