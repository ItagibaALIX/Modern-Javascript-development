import React, { useState } from 'react';
import MessageContext from './contex';
import Room from 'types/index'

function MessageProvider(props) {
  const { children } = props;
  const [currentRoom, setCurrentRoom] = useState<Room>(null);
  const [rooms, setRooms] = useState<[Room]>([]);

  return (
    <MessageContext.Provider value={{
      setCurrentRoom,
      currentRoom,
      rooms,
      setRooms,
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
