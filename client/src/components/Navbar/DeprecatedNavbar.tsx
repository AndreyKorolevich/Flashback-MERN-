import React, { useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import styles from './DeprecatedScssNavbar.module.scss'
import flashback from '../../img/flashback.png'
import decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { removeUsedData, UserType } from '../../actions/userAction'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { getTokenSelector, getUserDataSelector } from '../../selectors/postsSelectors'

type JwtTokenType = {
  exp: number;
}

const DeprecatedNavbar: React.FC<unknown> = () => {
  const user = useAppSelector<UserType | null>(getUserDataSelector)
  const token = useAppSelector<string | null>(getTokenSelector)
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(removeUsedData())
  }

  useEffect(() => {
    if (token) {
      const decodeToken = decode<JwtTokenType>(token)

      if (decodeToken.exp * 1000 < new Date().getTime()) {
        onLogout()
      }
    }
  })

  return (
    <div className={styles.brandContainer}>
      <AppBar className={styles.appBar} position='static' color='inherit'>
        <Typography component={Link} to={'/'} className={styles.heading} variant='h3' align='center'>
          Flashbacks
        </Typography>
        <img className={styles.image} src={flashback} alt='flashback' height='60'/>
        <Toolbar className={styles.toolbar}>
          {user
            ? (
              <div className={styles.profile}>
                <Avatar className={styles.purple} alt={user.name}
                        src={user.imageUrl}>{user?.name?.charAt(0)}</Avatar>
                <Typography className={styles.userName} variant={'h6'}>{user.name}</Typography>
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

export default DeprecatedNavbar