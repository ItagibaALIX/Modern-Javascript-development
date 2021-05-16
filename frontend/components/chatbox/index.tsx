import React, { useState } from 'react';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core';

import Input from './Input';
import ChatMessage from './ChatMessage';
import { useMessageContext } from 'components/Provider/Message';
import { useEffect } from 'react';
import { useUserContext } from 'components/Provider/User';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%',
    width: '100%',
  },
}));




function ChatBox(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ChatMessage/>
      <Input />
    </div>
  );
}

export default ChatBox;
