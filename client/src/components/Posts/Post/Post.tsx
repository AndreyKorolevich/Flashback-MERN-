import React from 'react'
import styles from './ScssPost.module.scss'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import DehazeIcon from '@mui/icons-material/Dehaze'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import { actionsPosts, deletePostThunk, likePostThunk, PostsResponseDataType } from '../../../actions/postsAction'
import moment from 'moment'
import { useAppDispatch } from '../../../hooks/hooks'

const Post: React.FC<PostsResponseDataType> = ({
                                                 likeCount,
                                                 message,
                                                 tags,
                                                 createAt,
                                                 name,
                                                 selectedFile,
                                                 title,
                                                 _id
                                               }) => {
  const dispatch = useAppDispatch()

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
    <Card className={styles.card}>
      <CardMedia className={styles.media} image={selectedFile} title={title}/>
      <div className={styles.overlay}>
        <Typography variant={'h6'}>{name}</Typography>
        <Typography variant={'body2'}>{moment(createAt).fromNow()}</Typography>
      </div>
      <div className={styles.overlay2}>
        <Button style={{ color: 'white' }} size={'small'} onClick={onClickMoreDetail}>
          <DehazeIcon fontSize={'small'}/>
        </Button>
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
        <Button size={'small'} color={'primary'} onClick={onClickLike}>
          <ThumbUpAltIcon fontSize={'small'}/>
          &nbsp; Like {` ${likeCount}`}
        </Button>
        <Button size={'small'} color={'primary'} onClick={onClickDelete}>
          <DeleteIcon fontSize={'small'}/>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post