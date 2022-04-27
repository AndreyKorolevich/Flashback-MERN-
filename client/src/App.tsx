import React from 'react'
import styles from './ScssApp.module.scss'
import { AppBar, Container, Grid, Grow, Typography } from '@material-ui/core'
import flashback from './img/flashback.png'
import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

const App = () => {
  return (
    <Container maxWidth='lg'>
      <AppBar className={styles.appBar} position='static' color='inherit'>
        <Typography className={styles.heading} variant='h3' align='center'>Flashbacks</Typography>
        <img className={styles.image} src={flashback} alt='flashback' height='60'/>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3}>
            <Grid className={styles.postContainer} item xs={12} sm={7}>
              <Posts/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App