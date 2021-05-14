import React, { useEffect, useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

import RoomType from '../../../types/index'
import Room from 'components/Room';
import ChatBox from 'components/chatbox';
import RoomSettings from 'components/RoomSettings';

import useRooms from '../../../hooks/rooms';

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
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxHeight: '100%',
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
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
  const [rooms, setRooms] = useState<[RoomType]>([]);
  const getRooms = useRooms();

  useEffect(() => {
    getRooms().then((room) => {
      if (room == null) {
        return;
      }
      setRooms([room]);
    });
  }, []);

  console.log({ rooms });
  const listRooms = rooms.map((r) => (
    <div className={classes.rooms}>
      <Room roomName={r.name} user={{ id: '1', username: 'a', email: '2' }} />
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
        <ChatBox />
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
