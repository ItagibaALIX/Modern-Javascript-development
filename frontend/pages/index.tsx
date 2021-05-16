import React from 'react';

import Head from 'components/Head';
import Homepage from 'components/pages/Homepage';
import Layout from 'components/Layout';
import { useUserContext } from 'components/Provider/User';
import { makeStyles, Typography } from '@material-ui/core';

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

export default function Home(): JSX.Element {
  const { user } = useUserContext();
  const classes = useStyles();

  return (
    <Layout>
      <Head title="Modern Javascript development" />
      { 
      user ? 
      (<Homepage />) :
      <div className={classes.container}>
        <Typography
          variant="subtitle1"
          className={classes.text}
        >
          Please Login or sign up to use MDJ
        </Typography>
      </div>
    }
    </Layout>
  );
}
