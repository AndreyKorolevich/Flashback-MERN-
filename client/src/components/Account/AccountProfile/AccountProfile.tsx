import React from 'react'
import styles from './ScssAccountProfile.module.scss'
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


const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
}

type AccountProfileType = {}

const AccountProfile: React.FC<AccountProfileType> = (props) => (
  <Card {...props}>
    <CardContent>
      <Box className={styles.box}>
        <Avatar src={user.avatar} className={styles.avatar}/>
        <Typography color="textPrimary" gutterBottom variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {`${user.city} ${user.country}`}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.timezone}
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

export default AccountProfile