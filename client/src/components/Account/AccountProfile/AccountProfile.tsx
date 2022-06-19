import React from 'react'
import styles from './ScssAccountProfile.module.scss'
import { useAppSelector } from '../../../hooks/hooks'
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

type AccountProfileType = {}

const AccountProfile: React.FC<unknown> = () => {
  const user = useAppSelector(getUserDataSelector)

  return (
    <Card elevation={3}>
      <CardContent>
        <Box className={styles.box}>
          <Avatar src={user?.imageUrl} className={styles.avatar}/>
          <Typography color="textPrimary" gutterBottom variant="h5">
            {user?.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.country} / {user?.city};  {user?.timeZone}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {user?.phone}
          </Typography>
        </Box>
      </CardContent>
      <Divider/>
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  )
}

export default AccountProfile