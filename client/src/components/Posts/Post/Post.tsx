import React from 'react'
import styles from './ScssPost.module.scss'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import DehazeIcon from '@mui/icons-material/Dehaze'
import DeleteIcon from '@mui/icons-material/Delete'
import { actionsPosts, deletePostThunk, likePostThunk, PostsResponseDataType } from '../../../actions/postsAction'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import Likes from '../../Like/Like'
import { UserType } from '../../../actions/authAction'
import { getUserDataSelector } from '../../../selectors/postsSelectors'

const Post: React.FC<PostsResponseDataType> = ({
                                                 likes,
                                                 message,
                                                 tags,
                                                 createAt,
                                                 name,
                                                 selectedFile,
                                                 title,
                                                 creator,
                                                 _id
                                               }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<UserType | null>(getUserDataSelector)
  const isCorrentUserCreator = user?._id === creator || user?.googleId === creator

  const onClickMoreDetail = () => {
    dispatch(actionsPosts.changeOpenedPostIdActionCreator(_id))
  }

  const onClickLike = () => {
    dispatch(likePostThunk(_id))
  }

  const onClickDelete = () => {
    dispatch(deletePostThunk(_id))
  }

  return (
    <Card className={styles.card} raised elevation={6}>
      <CardMedia className={styles.media} image={selectedFile} title={title}/>
      <div className={styles.overlay}>
        <Typography variant={'h6'}>{name}</Typography>
        <Typography variant={'body2'}>{moment(createAt).fromNow()}</Typography>
      </div>
      <div className={styles.overlay2}>
        {isCorrentUserCreator && <Button style={{ color: 'white' }} size={'small'} onClick={onClickMoreDetail}>
          <DehazeIcon fontSize={'small'}/>
        </Button>}
      </div>
      <div className={styles.details}>
        <Typography variant={'body2'} color={'textSecondary'}>{
          tags.map(tag => `#${tag}`).join('')
        }</Typography>
      </div>
      <Typography className={styles.title} variant={'h5'} gutterBottom>{title}</Typography>
      <CardContent className={styles.content}>
        <Typography className={styles.message} variant={'h6'} gutterBottom>{message}</Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button size={'small'} color={'primary'} disabled={!user} onClick={onClickLike}>
          <Likes likes={likes}/>
        </Button>
        {isCorrentUserCreator && <Button size={'small'} color={'primary'} onClick={onClickDelete}>
          <DeleteIcon fontSize={'small'}/>
          Delete
        </Button>}
      </CardActions>
    </Card>
  )
}

export default Post