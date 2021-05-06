import React, { useState } from 'react';
import io from 'socket.io-client';
import { makeStyles, Typography } from '@material-ui/core';

import Input from './Input';
import ChatMessage from './ChatMessage';

const useStyles = makeStyles((theme) => ({
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

  return (
    <div className={classes.container}>
      <ChatMessage lastMessage={lastMessage} />
      <Input socket={socket} />
    </div>
  );
}

export default ChatBox;