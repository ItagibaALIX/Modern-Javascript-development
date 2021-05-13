import { Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Head from 'components/Head';
import Homepage from 'components/pages/Homepage';

import { useUser } from '../hooks/auth';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    height: '100vh',
  },
}));

export default function Home(): JSX.Element {
  const router = useRouter();
  const classes = useStyles();
  const getUser = useUser();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (!user) {
      getUser().then(setUser);
    }
  }, [user, getUser, setUser]);
  return (
    <div className={classes.container}>
      <Head title="Modern Javascript development" />
      { user
        ? (
          <>
            {`Welcome ${user.username} !`}
          </>
        )
        : (
          <>
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={() => (router.push('/login'))}
            >
              Login
            </Button>
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={() => (router.push('/register'))}
            >
              Register
            </Button>
          </>
        )}
      <Homepage />
    </div>
  );
}
