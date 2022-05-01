import React, { useEffect, useState } from 'react'
import styles from './ScssForm.module.scss'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import DropZone from '../DropZone/DropZone'
import classname from 'classnames'
import { actionsPosts, createPostThunk, updatePostThunk } from '../../actions/postsAction'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getOpenedPostIdSelector, getOpenedPostSelector, getUserDataSelector } from '../../selectors/postsSelectors'
import { UserType } from '../../actions/authAction'
import { Alert } from '@mui/material'

type SelectedFileType = string | ArrayBuffer | null

export interface PostFormDataInterface {
  title: string
  message: string
  tags: string | Array<string>
  selectedFile: SelectedFileType
}

const Form: React.FC<unknown> = () => {
  const initialState = {
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  }

  const [postData, setPostData] = useState<PostFormDataInterface>(initialState)
  const dispatch = useAppDispatch()
  const openedPostId = useAppSelector(getOpenedPostIdSelector)
  const post = useAppSelector(getOpenedPostSelector)
  const user = useAppSelector<UserType | null>(getUserDataSelector)

  useEffect(() => {
    if (post) {
      setPostData(post)
    }
  }, [post])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (openedPostId === null) {
      dispatch(createPostThunk({ ...postData, name: user?.name }))
    } else {
      dispatch(updatePostThunk(openedPostId, { ...postData, name: user?.name }))
    }
    clear()
  }

  const clear = () => {
    dispatch(actionsPosts.changeOpenedPostIdActionCreator(null))
    setPostData(initialState)
  }

  const putSelectedFiles = (selectedFile: SelectedFileType, post: PostFormDataInterface) => {
    setPostData({ ...post, selectedFile })
  }

  return (
    <Paper className={styles.paper}>
      {!user
        ? <Alert severity="info">Please Sign In to create your own flashback and like other flashbacks!</Alert>
        : <form autoComplete={'off'} noValidate className={classname(styles.form, styles.root)} onSubmit={onSubmit}>
          <Typography variant={'h6'}>{openedPostId ? 'Editing' : 'Add'} a card</Typography>
          <TextField value={postData.title} name={'title'} variant={'outlined'} label={'Title'} fullWidth size={'small'}
                     onChange={(e) => setPostData({ ...postData, title: e.target.value })} className={styles.input}/>
          <TextField value={postData.message} name={'message'} variant={'outlined'} label={'Message'}
                     size={'small'} className={styles.input} fullWidth multiline minRows={3} maxRows={3}
                     onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
          <TextField value={postData.tags} name={'tags'} variant={'outlined'} label={'Tags'} fullWidth size={'small'}
                     onChange={(e) => setPostData({ ...postData, tags: e.target.value })} className={styles.input}/>
          <DropZone onChange={putSelectedFiles} postData={postData}/>
          <Button className={styles.buttonSubmit} variant='contained' color={'primary'} size={'large'} type={'submit'}
                  fullWidth>Submit</Button>
          <Button variant='contained' color={'secondary'} size={'small'} onClick={clear} fullWidth>Clear</Button>
        </form>}
    </Paper>
  )
}

export default Form