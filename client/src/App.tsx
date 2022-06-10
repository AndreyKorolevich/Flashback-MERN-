import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import Home from './components/Home/Home'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './components/Auth/Auth'
import { AUTH_DATA } from './constants'
import { useAppDispatch, useAppSelector } from './hooks/hooks'
import { actionsAuth, UserType } from './actions/authAction'
import PostDetails from './components/PostDetails/PostDetails'
import { getUserDataSelector } from './selectors/postsSelectors'
import Navbar from './components/Navbar/Navbar'
import Account from './components/Account/Account'

const App = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<UserType | null>(getUserDataSelector)

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem(AUTH_DATA) as string)
    dispatch(actionsAuth.setAuthActionCreator(authData?.user, authData?.token))
  }, [])

  return (
    <BrowserRouter>
      <Navbar/>
      <Container maxWidth='xl'>
        <Routes>
          <Route path={'/'} element={<Navigate replace to='/posts'/>}/>
          <Route path={'/posts'} element={<Home/>}/>
          <Route path={'/posts/search'} element={<Home/>}/>
          <Route path={'/post/:id'} element={<PostDetails/>}/>
          <Route path={'/auth'} element={!user ? <Auth/> : <Navigate replace to='/posts'/>}/>
          <Route path={'/account'} element={<Account />}/>
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App