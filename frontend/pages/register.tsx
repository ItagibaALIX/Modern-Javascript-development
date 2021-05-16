import React from 'react';
import { Formik, Form } from 'formik';
import { Typography, makeStyles } from '@material-ui/core';
import { useRegister } from 'hooks/auth';
import { registerSchema, RegisterParams } from 'utils/validation';
import { useRouter } from 'next/router'

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
  login: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[400],
    marginTop: theme.spacing(4),
  },
}));

export default function Register(): JSX.Element {
  const classes = useStyles();
  const initialValues: RegisterParams = { username: '', email: '', password: '' } as RegisterParams;
  const register = useRegister();
  const router = useRouter()

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        <Typography
          variant="subtitle1"
          className={classes.text}
        >
          Join the our chat
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={
              async (values: RegisterParams): Promise<void> => {
                const user = await register(values);

                if (user) {
                  router.push("/login")
                }
              }
          }
        >
          <Form
            noValidate
            className={classes.input}
          >
            <TextInput
              type="text"
              name="username"
              label="username"
              required
              fullWidth
            />
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
              Sign up
            </Button>
          </Form>
        </Formik>
        <Typography
          variant="caption"
          className={classes.login}
        >
          Already have an account?&nbsp;
          <TextLink href="/login">Sign in</TextLink>
        </Typography>
      </div>
    </div>
  );
}
