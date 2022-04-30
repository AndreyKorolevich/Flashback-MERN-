import React from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import styles from './ScssHome.module.scss'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import useStales from '../../materialStyles'

const Home: React.FC<unknown> = () => {
  const materialStyles: any = useStales()
  return (
    <Grow in>
      <Container>
        <Grid className={materialStyles.container} container justifyContent='space-between' alignItems='stretch'
              spacing={3}>
          <Grid className={styles.postContainer} item xs={12} sm={7}>
            <Posts/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home