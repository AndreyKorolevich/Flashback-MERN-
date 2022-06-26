import React, { useEffect, useRef, useState } from 'react'
import styles from './Comment.module.scss'
import { Button, TextField, Typography } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { UserType } from '../../../actions/userAction'
import { getUserDataSelector } from '../../../selectors/postsSelectors'
import { commentPostThunk, PostsResponseDataInterface } from '../../../actions/postsAction'
import useStyles from '../materialStyles'

type CommentType = {
  post: PostsResponseDataInterface | null
}

const Comment: React.FC<CommentType> = ({ post }) => {
  const user = useAppSelector<UserType | null>(getUserDataSelector)
  const [comment, setComment] = useState('')
  const dispatch = useAppDispatch()
  const classes = useStyles()
  const [comments, setComments] = useState<Array<string> | undefined>([])
  const commentsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setComments(post?.comments)
    commentsRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [post?.comments])

  const onComment = () => {
    dispatch(commentPostThunk(`${user?.name}: ${comment}`, post?._id))
    setComment('')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((comment, i) => (
            <Typography className={styles.comment} key={i} gutterBottom variant="subtitle1">
              <span className={styles.name}>{comment.split(': ')[0]}:</span>
              <div className={styles.message}>{comment.split(':')[1]}</div>
            </Typography>
          ))}
          <div ref={commentsRef}/>
        </div>
        {user && <div className={classes.field}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth minRows={4} variant="outlined" label="Comment" multiline value={comment}
                     onChange={onChange}/>
          <Button className={styles.buttonComment} fullWidth disabled={!comment.length} color="primary"
                  variant="contained" onClick={onComment}>
            Comment
          </Button>
        </div>}
      </div>
    </div>
  )
}

export default Comment