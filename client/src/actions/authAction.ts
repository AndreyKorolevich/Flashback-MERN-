import { ActionTypes, ThunkType } from '../reducers/store'
import * as api from '../api'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { AUTH, LOGOUT } from '../reducers/authReducer'
import { AuthFormStateType } from '../components/Auth/Auth'
import { NavigateFunction } from 'react-router-dom'
import { AUTH_DATA } from '../constants'

export type UserType = {
  email?: string
  firstName: string
  lastName: string
  googleId?: string
  _id?: string
  imageUrl?: string
  name?: string,
  phone?: string,
  country?: string,
  city?: string,
  timeZone?: string,
}

export const actionsAuth = {
  setAuthActionCreator: (user: UserType, token: string) => ({
    type: AUTH,
    payload: {
      user,
      token
    }
  } as const),
  removeAuthActionCreator: () => ({
    type: LOGOUT
  } as const)
}

export type AuthActionType = ActionTypes<typeof actionsAuth>

export const setUsedData = (user: UserType, token?: string): ThunkType<AuthActionType> => async (dispatch) => { //TODO cheack if needs async
  const saveToken = token ? token : JSON.parse(localStorage.getItem(AUTH_DATA) as string).token
  try {
    localStorage.setItem(AUTH_DATA, JSON.stringify({ user, token }))
    dispatch(actionsAuth.setAuthActionCreator(user, saveToken))
  } catch (e) {
    console.log(e)
  }
}

export const removeUsedData = (): ThunkType<AuthActionType> => async (dispatch) => {
  try {
    localStorage.removeItem(AUTH_DATA)
    dispatch(actionsAuth.removeAuthActionCreator())
  } catch (e) {
    console.log(e)
  }
}

export const googleSuccessThunk = (res: GoogleLoginResponse | GoogleLoginResponseOffline): ThunkType<AuthActionType> => async (dispatch) => {
  // @ts-ignore
  const user = res?.profileObj
  // @ts-ignore
  const token = res?.tokenId
  try {
    dispatch(setUsedData(user, token))
  } catch (e) {
    console.log(e)
  }
}

export const signInThunk = (formData: AuthFormStateType, navigate: NavigateFunction): ThunkType<AuthActionType> => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData)
    dispatch(setUsedData(data.user, data.token))
    navigate('/')
  } catch (e) {
    console.log(e)
  }
}

export const signUpThunk = (formData: AuthFormStateType, navigate: NavigateFunction): ThunkType<AuthActionType> => async (dispatch) => {
  try {
    const { data } = await api.signUn(formData)
    dispatch(setUsedData(data.user, data.token))
    navigate('/')
  } catch (e) {
    console.log(e)
  }
}

export const updateUserDataThunk = (formData: UserType): ThunkType<AuthActionType> => async (dispatch) => {
  try {
    const { data } = await api.updateUserData(formData)
    dispatch(setUsedData(data.user, data.token))
  } catch (e) {
    console.log(e)
  }
}

export const googleLogInThunk = (): ThunkType<AuthActionType> => async (dispatch) => {
  try {
    const { data } = await api.googleLogIn()
    dispatch(setUsedData(data.user, data.token))
  } catch (e) {
    console.log(e)
  }
}

