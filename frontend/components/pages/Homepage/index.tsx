import React, { useState } from 'react';
import io from 'socket.io-client';
import { makeStyles, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';

import Layout from 'components/Layout';
import TextInput from 'components/TextInput';
import Button from 'components/Button';

import useMessages from '../../../hooks/messages';

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
  const sendMessage = useMessages();
  const [messages, setMessages] = useState([]);
  let socket = io('ws://localhost:4001');

  if (process.browser) {
    socket = io(`ws://localhost:4001?token=${window.localStorage.getItem('token')}`, {
      autoConnect: true,
    });

    console.log('socket', socket);
    socket.on('msgToClient', (data) => {
      const msg = JSON.parse(data);
      setMessages((msgs) => [...msgs,
        <div>
          <span>
            <b>{msg.sender}</b>
            {`:${msg.message}`}
          </span>
        </div>,
      ]);
      console.log(data);
    });
  }

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
            {messages}
          </Typography>
          <Formik
            initialValues={initialValues}
            // validationSchema={loginSchema}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSubmit={(values: { message: string }): void => sendMessage(values)}
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
