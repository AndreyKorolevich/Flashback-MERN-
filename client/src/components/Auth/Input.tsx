import React from 'react'
import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

type InputType = {
  name: any,
  onShowPassword?: any,
  onChange: any,
  label: any,
  autoFocus?: any,
  type?: any,
  half?: any,
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
                 inputProps={name === 'password' ? {
                   endadornment: (
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
