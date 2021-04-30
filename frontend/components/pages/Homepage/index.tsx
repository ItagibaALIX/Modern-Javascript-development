import React, { useState } from 'react';
import io from 'socket.io-client';
import { makeStyles, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

export default Homepage;

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
    minWidth: 320,
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
}));

function Homepage(): JSX.Element {
  const [lastMessage, setLastMessage] = useState('');

  const socket = io('ws://localhost:4000', {
    autoConnect: true,
  });

  console.log('socket', socket);
  socket.on('msgToClient', (data) => {
    setLastMessage(data);
    console.log(data);
  });

  const classes = useStyles();
  const initialValues = { message: '' };

  return (
    <Layout>
      <h1 className="title">
        Modern Javascript development
      </h1>
      <div className={classes.container}>
        <div className={classes.formContainer}>
          <Typography
            variant="h6"
            className={classes.text}
          >
            Chat Box
          </Typography>
          <Typography
            variant="subtitle1"
            className={classes.text}
          >
            {lastMessage}
          </Typography>
          <Formik
            initialValues={initialValues}
            // validationSchema={loginSchema}
            onSubmit={(values: { message: string }): void => {
              console.log('emit:', values.message);
              socket.emit('msgToServer', values.message);
            }}
          >
            <Form noValidate className={classes.input}>
              <TextInput
                type="text"
                name="message"
                label="message"
                required
                rows={3}
                fullWidth
                multiline
              />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
              >
                Send
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    </Layout>
  );
}
