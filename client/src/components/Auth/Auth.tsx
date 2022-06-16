import React, { useState } from 'react'
import styles from './ScssAuth.module.scss'
import { useAppDispatch } from '../../hooks/hooks'
import { googleSuccessThunk, signInThunk, signUpThunk } from '../../actions/authAction'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Container, Paper, Avatar, Typography, Grid, Button } from '@material-ui/core'
import LockIcon from '@mui/icons-material/Lock'
import Input from './Input'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import Icon from './Icon'
import { getTimeZoneAndLocation } from '../../utils/getTimeZone'

export type AuthFormStateType = {
  firstName?: string
  lastName?: string
  email: string
  password: string
  confirmPassword?: string
  timeLocal: string
}

const GOOGLE_ID = '267157391403-mvl0ijkeo93u1ce0cekp4en4u3dbo69l.apps.googleusercontent.com'
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  timeLocal: getTimeZoneAndLocation()
}

const Auth: React.FC<unknown> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [formData, setFromData] = useState<AuthFormStateType>(initialState)
  const navigate: NavigateFunction = useNavigate()
  const dispatch = useAppDispatch()

  const onShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const switchMode = () => {
    setIsSignUp(!isSignUp)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSignUp) {
      dispatch(signUpThunk(formData, navigate))
    } else {
      dispatch(signInThunk(formData, navigate))
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = {
      [e?.target?.name]: e?.target?.value
    }
    setFromData({ ...formData, ...data })
  }

  const googleSuccess = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    dispatch(googleSuccessThunk(res))
    navigate('/')
  }

  const googleFailure = (error: Error) => {
    console.log(error)
  }
  return (
    <Container component={'main'} maxWidth={'xs'}>
      <Paper className={styles.paper} elevation={3}>
        <Avatar className={styles.avatar}>
          <LockIcon/>
        </Avatar>
        <Typography variant={'h5'}>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={styles.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input autoFocus half name={'firstName'} label={'First Name'} onChange={onChange}/>
                <Input autoFocus half name={'lastName'} label={'Last Name'} onChange={onChange}/>

              </>
            )}
            <Input name={'email'} type={'email'} onChange={onChange} label={'Email Address'}/>
            <Input name={'password'} type={showPassword ? 'text' : 'password'} onChange={onChange} label={'Password'}
                   onShowPassword={onShowPassword}/>
            {isSignUp &&
            <Input name={'confirmPassword'} type={'password'} onChange={onChange} label={'Repeat Password'}/>}
          </Grid>
          <Button type={'submit'} fullWidth variant={'contained'} color={'primary'} className={styles.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId={GOOGLE_ID}
            render={(renderProps) => (
              <Button className={styles.googleButton} color={'primary'} onClick={renderProps.onClick}
                      disabled={renderProps.disabled} startIcon={<Icon/>} variant={'contained'} fullWidth>
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
          />
          <Grid container justifyContent={'center'}>
            <Grid item>
              <Button onClick={switchMode} fullWidth>
                {isSignUp ? 'Already have an account? Sign in' : 'Don`t have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth