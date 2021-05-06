import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useUser } from 'hooks/auth';
import { User } from 'types';

import Button from 'components/Button';

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

export default function Login(): JSX.Element {
  const classes = useStyles();
  const user = useUser();

  const [infoUser, setInfoUser] = useState<User>();
  return (
    <div className={classes.container}>
      <Typography
        variant="subtitle1"
        className={classes.text}
      >
        {infoUser}
      </Typography>
      <Button
        color="primary"
        variant="contained"
        type="button"
        onClick={async () => {
          const info = await user();

          setInfoUser(info);
        }}
      >
        Get personal info
      </Button>
    </div>
  );
}
