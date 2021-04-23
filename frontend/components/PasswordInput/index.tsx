import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import makeStyles from '@material-ui/core/styles/makeStyles';

import TextInput, { TextInputProps } from '../TextInput';

export type PasswordInputProps = Omit<TextInputProps, 'type'>;

const useStyles = makeStyles((theme) => ({
  root: { color: theme.palette.grey[600] },
}));

const PasswordInput = (props: PasswordInputProps): JSX.Element => {
  const [visible, setVisibility] = useState(false);
  const classes = useStyles();

  const handleClickShowPassword = (): void => {
    setVisibility((v) => !v);
  };

  return (
    <TextInput
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment:
  <InputAdornment position="end">
    <IconButton
      aria-label="toggle password visibility"
      onClick={handleClickShowPassword}
      edge="end"
      className={classes.root}
    >
      {visible ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>,
      }}
      {...props}
    />
  );
};

export default PasswordInput;
