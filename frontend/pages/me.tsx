import React, { useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useUser } from 'hooks/auth';

import { useUserContext } from 'components/Provider/User';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '85vh',
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    minWidth: 175,
    fontSize: 24,
  },
}));

export default function Me(): JSX.Element {
  const classes = useStyles();
  const getUser = useUser();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    getUser().then((newUser) => (
      setUser(newUser)
    )).catch((e) => {
      console.log(e);
    });
  }, []);

  if (!user) return (<></>);

  return (
    <div className={classes.container}>
      <Typography
        variant="subtitle1"
        className={classes.text}
      >
        {user.id}
        {user.username}
        {user.email}
      </Typography>
    </div>
  );
}
