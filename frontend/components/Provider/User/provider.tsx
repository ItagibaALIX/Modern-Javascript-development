import React, { useEffect, useState } from 'react';
import { User } from 'types/index';

import UserContext from './contex';
// import { useUser } from 'hooks/auth';

function UserProvider(props) {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  // const getUser = useUser();

  // useEffect(() => {
  //   if (process.browser) {
  //     getUser().then((user) => {
  //     }

  //     ).catch((e) => {
  //       window.localStorage.setItem('token', null);
  //       setUser(null)
  //       console.log("bad token");
  //     });
  //   }
  // }, [getUser, setUser]);

  return (
    <UserContext.Provider value={{
      user,
      setUser,
    }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
