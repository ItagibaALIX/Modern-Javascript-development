import { Hidden, Typography } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import RightNav from 'components/Layout/Header/RightNav';
import Logo from 'components/Logo';
import { useUser } from 'hooks/auth';
import { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    height: '7vh',
    backgroundColor: theme.palette.background.default,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  links: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    padding: `0px ${theme.spacing(3)}px`,
    '& > a': { textDecoration: 'none' },
  },
  search: {
    maxWidth: 480,
    flex: 1,
    margin: `0 ${theme.spacing(3)}px`,
    [theme.breakpoints.down('xs')]: {
      margin: `0 ${theme.spacing(2)}px`,
    },
  },
  text: {
    textDecoration: 'none',
    fontSize: 14,
    color: theme.palette.grey[700],
    textAlign: 'left',
    margin: '0px 4px',
  },
  addRoomButton: {
    width: '150px',
    height: '40px',
    borderRadius: '7px',
    color: 'white',
  },
  textAddRoomButton: {
    color: 'white',
    paddingRight: theme.spacing(1),
    fontWeight: 500,
  },
}));

function Header(): JSX.Element {
  const classes = useStyles();
  const elevationTrigger = useScrollTrigger({ threshold: 10, disableHysteresis: true });
  const getUser = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((newUser) => (
      setUser(newUser)
    )).catch((e) => {
      console.log(e);
    });
  }, [getUser]);

  return (
    <AppBar
      elevation={elevationTrigger ? 3 : 0}
      className={classes.appBar}
      position="sticky"
      color="default"
    >
      <Toolbar className={classes.container}>
        <Hidden implementation="css" smUp>
          <Logo type="mini" />
        </Hidden>
        <Hidden implementation="css" xsDown>
          <Logo type="classic" size="sm" />
        </Hidden>
        {
          user ?
          <Fab color="primary" aria-label="add" className={classes.addRoomButton}>
            <Typography variant="subtitle1" className={classes.textAddRoomButton}>
              New room
            </Typography>
            <AddIcon />
          </Fab> : <></>
        }
        <RightNav />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
