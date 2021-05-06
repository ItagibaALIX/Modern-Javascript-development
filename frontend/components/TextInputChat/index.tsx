import React from 'react';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { InputBase } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  TextField: {
    border: `solid 1px ${theme.palette.primary.main}`,
    borderRadius: '5px',
    padding: theme.spacing(1),
  },
}));
export interface TextInputProps {
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  name: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  className?: string;
  disableHelperText?: boolean;
  autoComplete?: string;
  InputProps?: {
    endAdornment: JSX.Element;
  };
}

const TextInput = ({ disableHelperText = false, name, ...props }: TextInputProps): JSX.Element => {
  const [field] = useField({ name, ...props });
  const classes = useStyles();
  const { multiline, rows } = props;

  return (
    <InputBase
      id={name}
      placeholder="Aa"
      multiline={multiline}
      rows={rows}
      {...field}
      {...props}
      className={classes.TextField}
    />
  );
};

export default TextInput;
