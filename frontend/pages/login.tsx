import React from 'react';
import { loginSchema, LoginParams } from 'utils/validation';
import { makeStyles, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useLogin } from 'hooks/auth';

import TextInput from 'components/TextInput';
import PasswordInput from 'components/PasswordInput';
import TextLink from 'components/TextLink';
import Button from 'components/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '85vh',
  },
  formContainer: {
    display: 'flex',
    maxHeight: '70%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
    },
  },
  input: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minHeight: 150,
    minWidth: 280,
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(2),
    },
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    minWidth: 175,
    fontSize: 24,
  },
  register: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[400],
    marginTop: theme.spacing(4),
  },
  forgotPassword: {
    display: 'flex',
    marginTop: theme.spacing(4),
  },
}));

export default function Login(): JSX.Element {
  const classes = useStyles();
  const initialValues: LoginParams = { email: '', password: '' } as LoginParams;
  const login = useLogin();

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <Typography
          variant="subtitle1"
          className={classes.text}
        >
          Welcome back!
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={(values: LoginParams): void => {
            login(values);
          }}
        >
          <Form noValidate className={classes.input}>
            <TextInput
              type="email"
              name="email"
              label="email"
              required
              fullWidth
            />
            <PasswordInput
              name="password"
              label="password"
              required
              fullWidth
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              fullWidth
            >
              Sign in
            </Button>
          </Form>
        </Formik>
        {/* <TextLink
        className={classes.forgotPassword}
          href="/forgot_password">
            Forgot password?
        </TextLink> */}
        <Typography
          variant="caption"
          className={classes.register}
        >
          Don&apos;t have an account?&nbsp;
          <TextLink href="/register">Sign Up</TextLink>
        </Typography>
      </div>
    </div>
  );
}
