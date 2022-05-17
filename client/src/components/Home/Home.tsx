import React from 'react'
import { Container, Grid, Grow, Paper } from '@material-ui/core'
import styles from './ScssHome.module.scss'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStales from './materialStyles'
import Paginate from '../Paginate/Paginate'


const Home: React.FC<unknown> = () => {
  const classes: any = useStales()

  return (
    <Grow in>
      <Container maxWidth={'xl'}>
        <Grid className={classes.container} container justifyContent='space-between' alignItems='stretch'
              spacing={3}>
          <Grid className={styles.postContainer} container alignItems={'stretch'} spacing={3} item xs={12} sm={12} md={8} lg={9}>
            <Posts/>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Form/>
            <Paper className={styles.pagination} elevation={6}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home