import React, { useState } from 'react'
import styles from './ScssForm.module.scss'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import DropZone from '../DropZone/DropZone'
import classname from 'classnames'


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

  const clear = () => {

  }

  return (
    <Paper className={styles.paper}>
      <form autoComplete={'off'} noValidate className={classname(styles.form, styles.root)} onSubmit={onSubmit}>
        <Typography variant={'h6'}>Creating a card</Typography>
        <TextField value={postData.creator} name={'creator'} variant={'outlined'} label={'Creator'} fullWidth
                   className={styles.input} size={'small'}
                   onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField value={postData.title} name={'title'} variant={'outlined'} label={'Title'} fullWidth size={'small'}
                   onChange={(e) => setPostData({ ...postData, title: e.target.value })} className={styles.input}/>
        <TextField value={postData.message} name={'message'} variant={'outlined'} label={'Message'}
                   size={'small'} className={styles.input} fullWidth
                   onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
        <TextField value={postData.tags} name={'tags'} variant={'outlined'} label={'Tags'} fullWidth size={'small'}
                   onChange={(e) => setPostData({ ...postData, tags: e.target.value })} className={styles.input}/>
        <TextField value={postData.selectedFile} name={'selectedFile'} variant={'outlined'} label={'Selected file'}
                   fullWidth size={'small'}
                   onChange={(e) => setPostData({ ...postData, selectedFile: e.target.value })}/>
        <DropZone onChange={(e) => setPostData({ ...postData, selectedFile: e })}/>
        <Button className={styles.buttonSubmit} variant='contained' color={'primary'} size={'large'} type={'submit'}
                fullWidth>Submit</Button>
        <Button variant='contained' color={'secondary'} size={'small'} onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form