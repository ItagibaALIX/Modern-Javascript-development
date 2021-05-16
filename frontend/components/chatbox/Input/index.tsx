import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { Formik, Form } from 'formik';

import Button from 'components/Button';
import TextInputChat from 'components/TextInputChat';
import useMessages from 'hooks/messages';
import { MessageSendParams, messageSendSchema } from 'utils/validation';
import { useMessageContext } from 'components/Provider/Message';

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

function Input(): JSX.Element {
  const classes = useStyles();
  const { currentRoom } = useMessageContext();
  const initialValues = { message: '', room: currentRoom.id };
  const sendMessage = useMessages();

  return (
    <div className={classes.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={messageSendSchema}
        onSubmit={(values: MessageSendParams): void => {
          console.log("currentRoom.id", currentRoom.id, currentRoom.name);
          sendMessage({ room: currentRoom.id, message: values.message } as MessageSendParams);
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
