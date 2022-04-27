import React from 'react'
import styles from './ScssPost.module.scss'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import DehazeIcon from '@mui/icons-material/Dehaze'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import { actionsPosts, PostsResponseDataType } from '../../../actions/postsAction'
import moment from 'moment'
import { useAppDispatch } from '../../../hooks/hooks'

const Post: React.FC<PostsResponseDataType> = ({
                                                 likeCount,
                                                 message,
                                                 tags,
                                                 createAt,
                                                 creator,
                                                 selectedFile,
                                                 title,
                                                 _id
                                               }) => {
  const dispatch = useAppDispatch()
  const onClickMoreDetail = () => {
  dispatch(actionsPosts.changeOpenedPostIdActionCreator(_id))
  }
  const onClickLike = () => {

  }

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.media} image={selectedFile} title={title}/>
      <div className={styles.overlay}>
        <Typography variant={'h6'}>{creator}</Typography>
        <Typography variant={'body2'}>{moment(createAt).fromNow()}</Typography>
      </div>
      <div className={styles.overlay2}>
        <Button style={{ color: 'white' }} size={'small'} onClick={onClickMoreDetail}>
          <DehazeIcon fontSize={'small'}/>
        </Button>
      </div>
      <div className={styles.details}>
        <Typography variant={'body2'} color={'textSecondary'}>{tags.map(tag => `#${tag}`)}</Typography>
      </div>
      <Typography className={styles.title} variant={'h5'} gutterBottom>{title}</Typography>
      <CardContent className={styles.content} >
        <Typography className={styles.message} variant={'h6'} gutterBottom>{message}</Typography>
      </CardContent>
      <CardActions className={styles.cardActions}>
        <Button size={'small'} color={'primary'} onClick={onClickLike}>
          <ThumbUpAltIcon fontSize={'small'}/>
          Like
          {likeCount}
        </Button>
        <Button size={'small'} color={'primary'} onClick={onClickLike}>
          <DeleteIcon fontSize={'small'}/>
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default Post