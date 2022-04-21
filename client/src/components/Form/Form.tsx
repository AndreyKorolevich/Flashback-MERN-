import React, { useState } from 'react'
import styles from './ScssForm.module.scss'
import { Paper, TextField, Typography } from '@material-ui/core'


type PostDataType = {
  creator: string
  title: string
  message: string
  tags: string
  selectedFile: string
}
const Form: React.FC<unknown> = () => {
  const [postData, setPostData] = useState<PostDataType>({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  })
  const onSubmit = () => {

  }

  return (
    <Paper className={styles.paper}>
      <form autoComplete={'off'} noValidate className={styles.form} onSubmit={onSubmit}>
        <Typography variant={'h6'}>Creating a card</Typography>
        <TextField value={postData.creator} name={'creator'} variant={'outlined'} label={'Creator'} fullWidth
                   onChange={(e) => setPostData({ ...postData, creator: e.target.value })}/>
        <TextField value={postData.title} name={'title'} variant={'outlined'} label={'Title'} fullWidth
                   onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
        <TextField value={postData.message} name={'message'} variant={'outlined'} label={'Message'} fullWidth
                   onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
        <TextField value={postData.tags} name={'tags'} variant={'outlined'} label={'Tags'} fullWidth
                   onChange={(e) => setPostData({ ...postData, tags: e.target.value })}/>
        <TextField value={postData.selectedFile} name={'selectedFile'} variant={'outlined'} label={'Selected file'}
                   fullWidth
                   onChange={(e) => setPostData({ ...postData, selectedFile: e.target.value })}/>
        <div className={styles.fileInput}>
        </div>
      </form>
    </Paper>
  )
}

export default Form