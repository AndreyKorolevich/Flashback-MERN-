import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse'
    }
  }
}))