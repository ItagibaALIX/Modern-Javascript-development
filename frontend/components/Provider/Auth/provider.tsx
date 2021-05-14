import React, { useEffect, useState } from 'react';
import AuthContext from './contex';

function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({});

  useEffect(() => {
    const localToken = localStorage.getItem('token');

    if (localToken) {
      setUser(localToken);
    }
  }, [setUser]);

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
