import * as React from 'react'
import styles from './ScssNavbar.module.scss'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { Avatar, Button, Tooltip } from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { removeUsedData, UserType } from '../../actions/authAction'
import { getUserDataSelector } from '../../selectors/postsSelectors'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, SearchIconWrapper, StyledInputBase } from './materialStyles'
import { getPostsBySearchThunk, getPostsThunk } from '../../actions/postsAction'
import { useEffect } from 'react'


const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const Navbar: React.FC<unknown> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [searchValue, setSearchValue] = React.useState<string>('')
  const user = useAppSelector<UserType | null>(getUserDataSelector)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const query = useQuery()
  const page = Number(query.get('page')) || 1
  const searchQuery = query.get('searchQuery')

  const isMenuOpen = Boolean(anchorEl)

  useEffect(() => {
    if (searchQuery) {
      setSearchValue(searchQuery)
      dispatch(getPostsBySearchThunk(searchQuery, page))
    } else {
      dispatch(getPostsThunk(page))
    }
  }, [searchQuery, page])

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const onCleanSearch = () => {
    setSearchValue('')
  }

  const onLogout = () => {
    dispatch(removeUsedData())
  }

  const onAccount = () => {
    navigate(`/account`)
  }

  const searchPost = () => {
    if (searchValue.trim()) {
      dispatch(getPostsBySearchThunk(searchValue, 1))
      navigate(`/posts/search?page=${1}&searchQuery=${searchValue || 'none'}`)
    } else {
      navigate('/')
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLImageElement>) => {
    if (e.key === 'Enter') {
      searchPost()
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }} className={styles.container}>
      <AppBar position="static" elevation={6}>
        <Toolbar>
          <Typography
            variant="h4"
            color={'white'}
            noWrap
            onClick={onCleanSearch}
            component={Link}
            to={'/'}
            sx={{ display: { xs: 'none', sm: 'block' }, textDecoration: 'none' }}
          >
            Flashbacks
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              value={searchValue}
              onChange={onChange}
              onKeyPress={onKeyPress}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }}/>
          <Box sx={{ flexGrow: 0 }}>
            {user
              ? <div className={styles.userData}>
                <Typography className={styles.userName} noWrap
                            sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}
                            variant={'h6'}>{user.name}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0 }}>
                    <Avatar src={user.imageUrl} alt={user.name}/>
                  </IconButton>
                </Tooltip>
              </div>
              : <Button component={Link} to={'/auth'} color="inherit">Singin</Button>}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <Typography textAlign="center" onClick={onLogout}>Logout</Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Typography textAlign="center" onClick={onAccount}>Account</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
