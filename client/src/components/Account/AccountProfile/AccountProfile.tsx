import React, { useEffect, useState } from 'react'
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
import { useAppSelector } from '../../../hooks/hooks'
import { getUserDataSelector } from '../../../selectors/postsSelectors'
import { UserType } from '../../../actions/authAction'

type AccountProfileType = {}

const AccountProfile: React.FC<unknown> = () => {
  const [values, setValues] = useState<UserType>({
    givenName: '',
    familyName: '',
    imageUrl: '',
    country: 'USA',
    timeLocal: 'GTM-7:America/Los_Angeles'
  })
  const user = useAppSelector(getUserDataSelector)
  useEffect(() => {
    setValues({ ...values, ...user })
  }, [user])

  return (
    <Card elevation={3}>
      <CardContent>
        <Box className={styles.box}>
          <Avatar src={values.imageUrl} className={styles.avatar}/>
          <Typography color="textPrimary" gutterBottom variant="h5">
            {values.name}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {`${values?.timeLocal?.split(':')[1]} ${values.country}`}
          </Typography>
          <Typography color="textSecondary" variant="body2">
            {values?.timeLocal?.split(':')[0]}
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