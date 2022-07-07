import React from 'react'
import styles from './ScssPost.module.scss'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import DehazeIcon from '@mui/icons-material/Dehaze'
import DeleteIcon from '@mui/icons-material/Delete'
import { actionsPosts, deletePostThunk, likePostThunk, PostsResponseDataInterface } from '../../../actions/postsAction'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import Likes from '../../Like/Like'
import { UserType } from '../../../actions/userAction'
import { getUserDataSelector } from '../../../selectors/postsSelectors'
import { useNavigate } from 'react-router-dom'
import PostPhotos from './PostPhotos/PostPhotos'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'

interface PostInterface extends PostsResponseDataInterface {
  showDetails?: boolean
  showActions?: boolean
  itemId?: string
}

const Post: React.FC<PostInterface> = ({
                                         likes,
                                         message,
                                         tags,
                                         createAt,
                                         name,
                                         selectedFile,
                                         showDetails = true,
                                         showActions = true,
                                         title,
                                         creator,
                                         _id,
                                         itemId= ''
                                       }) => {
  React.useContext(VisibilityContext);

  const dispatch = useAppDispatch()
  const user = useAppSelector<UserType | null>(getUserDataSelector)
  const isCurrentUserCreator = user?._id === creator || user?.googleId === creator // TODO there is a bug
  const navigate = useNavigate()

  const onClickMoreDetail = () => {
    dispatch(actionsPosts.changeOpenedPostIdActionCreator(_id))
  }

  const onClickLike = () => {
    dispatch(likePostThunk(_id))
  }

  const onClickDelete = () => {
    dispatch(deletePostThunk(_id))
  }

  const openPost = () => {
    navigate(`/post/${_id}`)
  }

  return (
    <Card className={styles.card} raised elevation={3}>
      <PostPhotos selectedFile={selectedFile} onClick={openPost}/>
      <div className={styles.overlay}>
        <Typography className={styles.name} variant={'h6'}>{name}</Typography>
        <Typography className={styles.created} variant={'body2'}>{moment(createAt).fromNow()}</Typography>
      </div>
      <div className={styles.overlay2}>
        {isCurrentUserCreator && showDetails &&
        <Button style={{ color: 'white' }} size={'small'} onClick={onClickMoreDetail}>
          <DehazeIcon fontSize={'small'}/>
        </Button>}
      </div>
      <div className={styles.details}>
        <Typography variant={'body2'} color={'textSecondary'}>{
          tags.map(tag => `#${tag}`).join('')
        }</Typography>
      </div>
      <Typography className={styles.title} variant={'h5'}>{title}</Typography>
      <CardContent className={styles.content}>
        <Typography className={styles.message} variant={'h6'} gutterBottom>{message}</Typography>
      </CardContent>
      {showActions && <CardActions className={styles.cardActions}>
        <Button size={'small'} color={'primary'} disabled={!user} onClick={onClickLike}>
          <Likes likes={likes}/>
        </Button>
        {isCurrentUserCreator && <Button size={'small'} color={'secondary'} onClick={onClickDelete}>
          <DeleteIcon fontSize={'small'}/>
          Delete
        </Button>}
      </CardActions>}
    </Card>
  )
}

export default Post