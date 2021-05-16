import React, { useState, useEffect } from 'react';
import MessageContext from './contex';
import { Room, Message } from 'types/index'
import io from 'socket.io-client';
import { useUserContext } from '../User';

function MessageProvider(props) {
  const { children } = props;
  const [currentRoom, setCurrentRoom] = useState<Room>(null);
  const [rooms, setRooms] = useState<[Room]>([]);
  const [messages, setMessages] = useState<[Message]>([]);
  const { user } = useUserContext();

  // if (process.browser) {

  //   window.localStorage.setItem('messages', []);
  //   window.localStorage.setItem('token', '');
  // }
  // window.localStorage.setItem('messages', []);

  useEffect(() => {
    if (user) {
      const socket = io(`ws://localhost:4001?token=${window.localStorage.getItem('token')}`, {
        autoConnect: true,
      });
      console.debug("socket:", socket, " user id:", user.id);
      if (!messages) {
        const localMessage = window.localStorage.getItem('messages');
        if (localMessage) {
          setMessages(JSON.parse(localMessage));
        }
      }
      socket.on(user.id, (data) => {
        console.log(user.id, JSON.parse(data));
        if (messages) {
          messages.push(JSON.parse(data));
          setMessages(messages);
          window.localStorage.setItem('messages', JSON.stringify(messages));
        } else {
          setMessages([JSON.parse(data)]);
          window.localStorage.setItem('messages', JSON.stringify([JSON.parse(data)]));
        }
      });
      return (() => {
        socket.close();
      })
    }
  }, [messages, setMessages, user])

  return (
    <MessageContext.Provider value={{
      setCurrentRoom,
      currentRoom,
      rooms,
      setRooms,
      messages,
      setMessages,
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;

