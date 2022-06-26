import { AuthActionType, UserType } from '../actions/userAction'

export const AUTH = 'AUTH'
export const LOGOUT = 'LOGOUT'

type AuthStateType = {
  user: UserType | null,
  token: string | null
}

const initialState = {
  user: null,
  token: null
}

export default (state: AuthStateType = initialState, action: AuthActionType) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null
      }
    default:
      return state
  }
}