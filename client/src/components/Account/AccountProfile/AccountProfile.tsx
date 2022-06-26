import React, { ChangeEvent, useRef, useState } from 'react'
import styles from './ScssAccountProfile.module.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getUserDataSelector } from '../../../selectors/postsSelectors'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material'
import { FileWithPath } from 'react-dropzone'
import { setUserImageThunk } from '../../../actions/userAction'

type AccountProfileType = {}

const AccountProfile: React.FC<unknown> = () => {
  const user = useAppSelector(getUserDataSelector)
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const onClick = () => {
    inputRef?.current?.click()
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newImage = event?.target?.files

    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.error('file reading has failed')
    reader.onload = () => {
      const binaryStr = reader.result as string
      dispatch(setUserImageThunk(binaryStr, user?.email))
    }
    // @ts-ignore
    reader.readAsDataURL(newImage[0])

  }

  return (
    <Card elevation={3}>
      <CardContent>
        <Box className={styles.box}>
          <Avatar src={user?.imageUrl} className={styles.avatar}/>
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user?.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.country} / {user?.city}; {user?.timeZone}
          </Typography>
          {user?.phone && <Typography color="textSecondary" variant="body2">
            {'tel: '}{user?.phone}
          </Typography>}
        </Box>
      </CardContent>
      <Divider/>
      <CardActions>
        <Button onClick={onClick} color="primary" fullWidth variant="text">
          <input onChange={onChange} ref={inputRef} className={styles.file} type='file'/>
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )
}

export default AccountProfile