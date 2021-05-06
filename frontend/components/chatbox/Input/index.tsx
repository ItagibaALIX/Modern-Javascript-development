import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';

import Button from 'components/Button';
import TextInputChat from 'components/TextInputChat';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '100%',
    maxHeight: '10vh',
    height: '10vh',
    padding: theme.spacing(1),
  },
  containerInput: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    flex: 0.09,
    alignItems: 'center',
  },
  textInput: {
    display: 'flex',
    flex: 0.9,
    alignItems: 'center',
  },
}));

function Input(props): JSX.Element {
  const { socket } = props;
  const classes = useStyles();
  const initialValues = { message: '' };

  return (
    <div className={classes.container}>
      <Formik
        initialValues={initialValues}
        // validationSchema={loginSchema}
        onSubmit={(values: { message: string }): void => {
          console.log('emit:', values.message);
          socket.emit('msgToServer', values.message);
        }}
      >
        <Form noValidate className={classes.containerInput}>
          <div className={classes.textInput}>
            <TextInputChat
              type="text"
              name="message"
              label="message"
              required
              disableHelperText
              rows={3}
              fullWidth
              multiline
            />
          </div>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            fullWidth
            className={classes.button}
          >
            Send
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default Input;