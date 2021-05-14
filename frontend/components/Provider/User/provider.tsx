import React, { useEffect, useState } from 'react';
import UserContext from './contex';
import { User } from 'types/index'

function UserProvider(props) {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
