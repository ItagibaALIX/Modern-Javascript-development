import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

import RoomBox from 'components/RoomBox';
import ChatBox from 'components/chatbox';
import RoomSettings from 'components/RoomSettings';
import { useMessageContext } from 'components/Provider/Message';
import { useUserContext } from 'components/Provider/User';

import { useRooms } from '../../../hooks/rooms';

export default Homepage;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    maxHeight: '100%',
  },
  paddingPannel: {
    padding: theme.spacing(1),
    display: 'flex',
    flex: 0.2,
    maxHeight: '93vh',
    height: '93vh',
  },
  pannel: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    maxHeight: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    border: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.primary.main,
  },
  containerChatBox: {
    display: 'flex',
    height: '100%',
    maxHeight: '100%',
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSettings: {
    display: 'flex',
    maxHeight: '100%',
    height: '100%',
    padding: theme.spacing(1),
  },
  paper: {
    display: 'flex',
    padding: theme.spacing(1),
    textAlign: 'center',
    flexDirection: 'column',
    color: theme.palette.text.primary,
    maxHeight: '100%',
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rooms: {
  },
  subtitle: {
    fontWeight: 800,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
}));

function Homepage(): JSX.Element {
  const classes = useStyles();
  const { rooms, setRooms, currentRoom } = useMessageContext();
  const { user } = useUserContext();
  const getRooms = useRooms();

  useEffect(() => {
    getRooms().then((userRooms) => {
      if (userRooms == null) {
        return;
      }
      console.debug('userRooms', userRooms);
      setRooms(() => userRooms);
    });
  }, []);

  if (!rooms || !rooms.length) {
    return (<></>)
  }

  const listRooms = rooms.map((r) => (
    <div className={classes.rooms} key={JSON.stringify(r)}>
      <RoomBox room={r} user={user} />
    </div>
  ));

  return (
    <div className={classes.container}>
      <div className={classes.paddingPannel}>
        <div className={classes.pannel}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Chat Rooms:
          </Typography>
          <div className={classes.paper}>
            {listRooms}
          </div>
        </div>
      </div>
      <div className={classes.containerChatBox}>
        {currentRoom ? <ChatBox /> : <></> }
      </div>
      <div className={classes.paddingPannel}>
        <div className={classes.pannel}>
          <Typography variant="subtitle1" className={classes.subtitle}>
            Room settings:
          </Typography>
          <RoomSettings />
        </div>
      </div>
    </div>
  );
}
