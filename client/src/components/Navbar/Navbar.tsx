import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import styles from './ScssNavbar.module.scss'
import flashback from '../../img/flashback.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { actionsAuth, UserType } from '../../actions/authAction'
import { useAppDispatch } from '../../hooks/hooks'

type AuthDataType = {
  user: UserType,
  token: string
}

const Navbar: React.FC<unknown> = () => {
  const [authData, setAuthData] = useState<AuthDataType | null>(null)
  const dispatch = useAppDispatch()
  const location = useLocation()

  useEffect(() => {
    const token = authData?.token
    setAuthData(JSON.parse(localStorage.getItem('authData') as string))
  },[location])

  const onLogout = () => {
    dispatch(actionsAuth.logoutActionCreator())
    localStorage.removeItem('authData')
    setAuthData(null)
  }

  return (
    <div className={styles.brandContainer}>
      <AppBar className={styles.appBar} position='static' color='inherit'>
        <Typography component={Link} to={'/'} className={styles.heading} variant='h3' align='center'>
          Flashbacks
        </Typography>
        <img className={styles.image} src={flashback} alt='flashback' height='60'/>
        <Toolbar className={styles.toolbar}>
          {authData
            ? (
              <div className={styles.profile}>
                <Avatar className={styles.purple} alt={authData.user.name}
                        src={authData.user.imageUrl}>{authData.user.name.charAt(0)}</Avatar>
                <Typography className={styles.userName} variant={'h6'}>{authData.user.name}</Typography>
                <Button component={Link} to={'/auth'} variant={'contained'} className={styles.logout}
                        color={'secondary'} onClick={onLogout}>
                  Logout
                </Button>
              </div>
            )
            : (
              <Button component={Link} to={'/auth'} variant={'contained'} color={'primary'}>Sing in</Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar