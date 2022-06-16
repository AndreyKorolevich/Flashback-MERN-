import React from 'react'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

type InputType = {
  name: string,
  onShowPassword?: () => void,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  label: string,
  autoFocus?: any,
  type?: string,
  half?: boolean,
}

const Input: React.FC<InputType> = ({ onShowPassword, onChange, half, name, autoFocus, type, label }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField name={name}
                 onChange={onChange}
                 variant={'outlined'}
                 required
                 fullWidth
                 label={label}
                 autoFocus={autoFocus}
                 type={type}
                 InputProps={name === 'password' ? {
                   endAdornment: (
                     <InputAdornment position={'end'}>
                       <IconButton onClick={onShowPassword}>
                         {type === 'password' ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                       </IconButton>
                     </InputAdornment>
                   )
                 } : undefined}
      />
    </Grid>
  )
}

export default Input
