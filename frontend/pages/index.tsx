import { Button, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';

import Head from 'components/Head';
import Homepage from 'components/pages/Homepage';

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

  return (
    <div className={classes.container}>
      <Head title="Modern Javascript development" />
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
      <Homepage />
    </div>
  );
}
