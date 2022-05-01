import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import { AUTH_DATA } from './constants'
import { useAppDispatch } from './hooks/hooks'
import { actionsAuth } from './actions/authAction'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem(AUTH_DATA) as string)
    dispatch(actionsAuth.setAuthActionCreator(authData?.user, authData?.token))
  })

  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar/>
        <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'/auth'} element={<Auth/>}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App