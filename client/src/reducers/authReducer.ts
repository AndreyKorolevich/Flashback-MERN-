import { AuthActionType, UserType } from '../actions/authAction'

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
        ...state
      }
    case LOGOUT:
      return {
        ...initialState
      }
    default:
      return state
  }
}