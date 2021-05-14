import React, { useState } from 'react';
import MessageContext from './contex';

function MessageProvider(props) {
  const { children } = props;
  const [currentRoom, setCurrentRoom] = useState([]);

  return (
    <MessageContext.Provider value={{
      setCurrentRoom,
      currentRoom,
    }}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageProvider;
