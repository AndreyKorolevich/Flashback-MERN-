import React from 'react'
import { AppBar, Container, Typography } from '@material-ui/core'
import flashback from './img/flashback.png'

const App = () => {
  return (
    <Container maxWidth='lg'>
      <AppBar position='static' color='inherit'>
        <Typography variant='h2' align='center'>Flashback</Typography>
        <img src={flashback} alt='flashback' height='60'/>
      </AppBar>

    </Container>
  )
}

export default App