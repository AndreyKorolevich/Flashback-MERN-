export const FETCH_ALL = 'FETCH_ALL'

export default (state = [], action: any) => {
  switch (action.type) {
    case FETCH_ALL:
      return []
    default:
      return state
  }
}