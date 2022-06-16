import React from 'react'
import styles from './ScssAccount.module.scss'
import { Box, Container, Grid, Typography } from '@mui/material';
import AccountProfile from './AccountProfile/AccountProfile'
import AccountProfileDetails from './AccountProfileDetails/AccountProfileDetails'

const Account: React.FC<unknown> = () => {
  return (
    <>
      <Box className={styles.box} component="main">
        <Container maxWidth="lg">
          <Typography className={styles.typo} variant="h4">
            Account
          </Typography>
          <Grid container spacing={3} >
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile/>
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Account

