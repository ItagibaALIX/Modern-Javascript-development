import React, { useState, useEffect } from 'react';
import { Room, Message } from 'types/index';
import io from 'socket.io-client';

import { useUserContext } from '../User';

import MessageContext from './contex';

function MessageProvider(props) {
  const { children } = props;
  const [currentRoom, setCurrentRoom] = useState<Room>(null);
  const [rooms, setRooms] = useState<[Room]>([]);
  const [messages, setMessages] = useState<[Message]>([]);
  const { user } = useUserContext();

  // if (process.browser) {
  //   window.localStorage.setItem('messages', '');
  //   window.localStorage.setItem('token', '');
  // }

  useEffect(() => {
    if (user) {
      const socket = io(`ws://localhost:4001?token=${window.localStorage.getItem('token')}`, {
        autoConnect: true,
      });
      console.log('socket:', socket, 'user id:');
      if (!messages.length) {
        const localMessage = window.localStorage.getItem('messages');
        console.log('check local storage', localMessage);
        if (localMessage && localMessage.length) {
          const parsed = JSON.parse(localMessage);
          const cp = new Array<[Message]>(...parsed);

          setMessages(cp);
        }
      }
      socket.on(user.id, (data) => {
        console.log('new message:', user.id, JSON.parse(data));
        if (messages) {
          const cp = new Array<[Message]>(...messages);
          cp.push(JSON.parse(data));
          setMessages(cp);
          window.localStorage.setItem('messages', JSON.stringify(cp));
        } else {
          const cp = new Array<[Message]>(JSON.parse(data));

          setMessages(cp);
          window.localStorage.setItem('messages', JSON.stringify(cp));
        }
      });
      return (() => {
        socket.close();
      });
    }
  }, [user, messages, setMessages]);

  return (
    <MessageContext.Provider value={{
      setCurrentRoom,
      currentRoom,
      rooms,
      setRooms,
      messages,
      setMessages,
    }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
