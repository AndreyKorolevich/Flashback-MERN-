import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './ScssAccountProfileDetails.module.scss'
import { UserType } from '../../../actions/authAction'
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
import { useAppSelector } from '../../../hooks/hooks'
import { getUserDataSelector } from '../../../selectors/postsSelectors'


const genders = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  },
  {
    value: 'na',
    label: 'I don`t wish to answer'
  }
]

type AccountProfileDetailsType = {}

const AccountProfileDetails: React.FC<AccountProfileDetailsType> = (props) => {
  const [values, setValues] = useState<UserType>({
    givenName: '',
    familyName: '',
    email: '',
    phone: '',
    gender: 'na',
    country: 'USA'
  })
  const user = useAppSelector(getUserDataSelector)


  useEffect(() => {
    setValues({ ...values, ...user })
  }, [user])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
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
                helperText="Please specify the first name"
                label="First name"
                name="givenName"
                onChange={handleChange}
                required
                value={values.givenName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="familyName"
                onChange={handleChange}
                required
                value={values.familyName}
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
                label="Select Gender"
                name="gender"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.gender}
                variant="outlined"
              >
                {genders.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider/>
        <Box
          className={styles.box}>
          <Button color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  )
}

export default AccountProfileDetails