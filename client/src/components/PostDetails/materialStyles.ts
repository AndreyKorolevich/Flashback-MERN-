import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column'
    }
  },
  imageSection: {
    marginLeft: '20px',
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%',
    }
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      flexDirection: 'column'
    }
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    width: '45%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  field: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
}))