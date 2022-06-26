import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './ScssAccountProfileDetails.module.scss'
import { updateUserDataThunk, UserType } from '../../../actions/userAction'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { getUserDataSelector } from '../../../selectors/postsSelectors'
import { getTimeZone } from '../../../utils/getTimeZone'

type AccountProfileDetailsType = {}

const AccountProfileDetails: React.FC<AccountProfileDetailsType> = (props) => {
  const [values, setValues] = useState<UserType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'USA',
    city: 'Los Angeles',
    timeZone: getTimeZone(),
  })
  const user = useAppSelector(getUserDataSelector)
  const dispatch = useAppDispatch()


  useEffect(() => {
    setValues({ ...values, ...user })
  }, [user])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const onSaveDetails = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updateUserDataThunk(values))
  }

  return (
    <form autoComplete="off" noValidate{...props}>
      <Card elevation={3}>
        <CardHeader subheader="The information can be edited" title="Profile"/>
        <Divider/>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                disabled={true}
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <Box
          className={styles.box}>
          <Button onClick={onSaveDetails} color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  )
}

export default AccountProfileDetails