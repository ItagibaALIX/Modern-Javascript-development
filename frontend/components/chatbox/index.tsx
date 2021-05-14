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
  const [socket, setSocket] = useState(null);

  if (process.browser && !socket) {
    const newSocket = io(`ws://localhost:4001?token=${window.localStorage.getItem('token')}`, {
      autoConnect: true,
    });
    setSocket(newSocket);
    console.log('socket', socket);
    newSocket.on('msgToClient', (data) => {
      setLastMessage(data);
      console.log(data);
    });
  }
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ChatMessage lastMessage={lastMessage} />
      <Input socket={socket} />
    </div>
  );
}

export default ChatBox;
