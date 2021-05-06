import React, { useState } from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import ChatBox from 'components/chatbox';
import Room from 'components/Room';

export default Homepage;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    maxHeight: '100%',
  },
  containerRooms: {
    display: 'flex',
    flex: 0.3,
    maxHeight: "93vh",
    height: "93vh",
    padding: theme.spacing(1),
  },
  containerChatBox: {
    display: 'flex',
    height: '100%',
    maxHeight: '100%',
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    maxHeight: "100%",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    border: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.primary.main,
    overflowY: "scroll",
  },
  rooms: {
    margin: theme.spacing(2),
  },
}));

function Homepage(): JSX.Element {
  const classes = useStyles();

  const listRooms = rooms.map((r) => {
    return (
      <div className={classes.rooms}>
        <Room user={r.user} />
      </div>
    )
  })

  return (
    <div className={classes.container}>
      <div className={classes.containerRooms}>
        <div className={classes.paper}>
          <Typography variant="subtitle1">
            Chat Room:
          </Typography>
          {listRooms}
        </div>
      </div>
      <div className={classes.containerChatBox}>
        <ChatBox />
      </div>
    </div>
  );
}


const rooms = [
  {
    user: {
      id: 1,
      username: "Raphael",
      email: "raph@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {

    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {

    user: {
      id: 1,
      username: "Raphael",
      email: "raph@gmail.com",
    }
  },
  {

    user: {
      id: 1,
      username: "Raphael",
      email: "raph@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {
    user: {
      id: 1,
      username: "Raphael",
      email: "raph@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {
    user: {
      id: 1,
      username: "Raphael",
      email: "raph@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    }
  },
  {
    user: {
      id: 1,
      username: "Raphael",
      email: "raph@gmail.com",
    }
  },
  {
    user: {
      id: 0,
      username: "Maxime",
      email: "max@gmail.com",
    },
  },
]