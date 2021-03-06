import { Hidden, Typography } from '@material-ui/core';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useUser } from 'hooks/auth';
import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form } from 'formik';
import { useCreateRoom, useRooms } from 'hooks/rooms';
import { CreateRoomParams, createRoomSchema } from 'utils/validation';

import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Logo from 'components/Logo';
import RightNav from 'components/Layout/Header/RightNav';
import { useMessageContext } from 'components/Provider/Message';
import { useUserContext } from 'components/Provider/User';

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
  addRoomButton: {
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
  const { user, setUser } = useUserContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!user) {
      getUser().then((newUser) => (
        setUser(newUser)
      )).catch((e) => {
        console.log(e);
      });
    }
  }, []);

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
          user
            ? (
              <Fab color="primary" aria-label="add" className={classes.addRoomButton} onClick={handleClickOpen}>
                <Typography variant="subtitle1" className={classes.textAddRoomButton}>
                  New room
                </Typography>
                <AddIcon />
              </Fab>
            ) : <></>
        }
        <RightNav />
      </Toolbar>
      <CreateRoomDialogue
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
      />
    </AppBar>
  );
}

export default Header;

function CreateRoomDialogue(props) {
  const { handleClose, open } = props;
  const createRoom = useCreateRoom();
  const getRooms = useRooms();
  const { setRooms } = useMessageContext();

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ name: '' }}
            validationSchema={createRoomSchema}
            onSubmit={
              async (values: CreateRoomParams): Promise<void> => {
                console.log('create room:', values);
                await createRoom(values);
                getRooms().then((userRooms) => {
                  if (userRooms == null) {
                    return;
                  }
                  setRooms(() => userRooms);
                });
                handleClose();
              }
            }
          >
            <Form noValidate>
              <TextInput
                type="text"
                name="name"
                label="room name"
                required
                fullWidth
              />
              <DialogActions>
                <Button
                  color="primary"
                  variant="outlined"
                  type="button"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                >
                  Create
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
