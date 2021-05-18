import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

import Avatar from 'components/Avatar';
import { useMessageContext } from 'components/Provider/Message';
import { useUserContext } from 'components/Provider/User';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxHeight: '83vh',
    height: '83vh',
  },
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
    },
    width: '100%',
    minWidth: '100%',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'scroll',
  },
  containerFlexPostion: {
    display: 'flex',
    justifyContent: (props: { isMyMessage: boolean }): string => (props.isMyMessage ? 'flex-end' : 'flex-start'),
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    height: 'auto',
  },
  containerMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'fit-content',
    maxWidth: '40%',
    height: 'auto',
    padding: theme.spacing(1),
    margin: theme.spacing(0.5),
    border: `solid 1px ${theme.palette.primary.main}`,
    borderRadius: '20px',
    backgroundColor: (props: { isMyMessage: boolean }): string => (props.isMyMessage ? theme.palette.primary.main : 'white'),
  },
  text: {
    color: (props: { isMyMessage: boolean }): string => (props.isMyMessage ? 'white' : theme.palette.text.primary),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',

    fontSize: 13,
    width: '100%',
    minWidth: '100%',
    height: 'auto',
  },
}));

function MessageEngine(props): JSX.Element {
  const { message } = props;
  const { user } = useUserContext();
  const isMyMessage = user.username.localeCompare(message.sender);
  const classes = useStyles({ isMyMessage: !isMyMessage });

  return (
    <div className={classes.containerFlexPostion}>
      {
        !isMyMessage
          ? (
            <>
              <div className={classes.containerMessage}>
                <Typography
                  variant="subtitle1"
                  className={classes.text}
                >
                  {message.message}
                </Typography>
              </div>
              <Avatar name={message.sender} withName={false} />
            </>
          )
          : (
            <>
              <Avatar name={message.sender} withName={false} />
              <div className={classes.containerMessage}>
                <Typography
                  variant="subtitle1"
                  className={classes.text}
                >
                  {message.message}
                </Typography>
              </div>
            </>
          )
      }
    </div>
  );
}

function ChatMessage(): JSX.Element {
  const classes = useStyles({ isMyMessage: true });
  const { messages, currentRoom } = useMessageContext();

  if (!messages) {
    return (
      <div className={classes.container}>
      <div className={classes.formContainer}>
        <></>
      </div>
    </div>
    )
  }

  console.log('messages', messages);
  const messagesFormated = messages.map((message, idx) => {
    console.log(currentRoom.id, message.room);
    const filterRoom = currentRoom.id.localeCompare(message.room);

    if (filterRoom) {
      return (
        <div key={JSON.stringify(message) + idx} />
      );
    }
    return (
      <MessageEngine message={message} key={JSON.stringify(message) + idx} />
    );
  });

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        {messagesFormated}
      </div>
    </div>
  );
}

export default ChatMessage;
