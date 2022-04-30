import { ActionTypes, ThunkType } from '../reducers/store'
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { AUTH, LOGOUT } from '../reducers/authReducer'

export type UserType = {
  email: string
  familyName: string
  givenName: string
  googleId: string
  imageUrl: string
  name: string
}

export const actionsAuth = {
  googleSuccessActionCreator: (user: UserType, token: string) => ({
    type: AUTH,
    payload: {
      user,
      token
    }
  } as const),
   logoutActionCreator: () => ({
    type: LOGOUT,
  } as const),
}

export type AuthActionType = ActionTypes<typeof actionsAuth>


export const googleSuccessThunk = (res: GoogleLoginResponse | GoogleLoginResponseOffline): ThunkType<AuthActionType> => async (dispatch) => {
  console.log(res)

  // @ts-ignore
  const user = res?.profileObj
  // @ts-ignore
  const token = res?.tokenId
  try {
    localStorage.setItem('authData', JSON.stringify({user, token}))
    dispatch(actionsAuth.googleSuccessActionCreator(user, token))
  } catch (e) {
    console.log(e)
  }
}

export const signInThunk = (formData, navigate): ThunkType<AuthActionType> => async (dispatch) => {

  try {

  } catch (e) {

  }
}

export const signUpThunk = (formData, navigate): ThunkType<AuthActionType> => async (dispatch) => {

  try {

  } catch (e) {

  }
}

