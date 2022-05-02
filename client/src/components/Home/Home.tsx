import React from 'react'
import { Container, Grid, Grow, Paper } from '@material-ui/core'
import styles from './ScssHome.module.scss'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStales from '../../materialStyles'
import Paginate from '../Paginate/Paginate'
import { useLocation, useNavigate } from 'react-router-dom'

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Home: React.FC<unknown> = () => {
  const query = useQuery()
  const navigate = useNavigate()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')
  const materialStyles: any = useStales()

  return (
    <Grow in>
      <Container maxWidth={'xl'}>
        <Grid className={materialStyles.container} container justifyContent='space-between' alignItems='stretch'
              spacing={3}>
          <Grid className={styles.postContainer} item xs={12} sm={6} md={9}>
            <Posts/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Form/>
            <Paper className={styles.pagination} elevation={6}>
              <Paginate/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home