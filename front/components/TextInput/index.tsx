import React from 'react';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    margin: 0,
  },
});

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
  const [field, meta] = useField({ name, ...props });
  const classes = useStyles();
  const { multiline, rows } = props;
  let helperText = ' ';
  if (disableHelperText) {
    helperText = '';
  } else if (!!meta.error && meta.touched) {
    helperText = meta.error;
  }

  return (
    <TextField
      id={name}
      variant="outlined"
      helperText={helperText}
      error={!!(meta.error && meta.touched)}
      size="small"
      multiline={multiline}
      rows={rows}
      FormHelperTextProps={{ classes: { root: classes.root } }}
      {...field}
      {...props}
    />
  );
};

export default TextInput;
