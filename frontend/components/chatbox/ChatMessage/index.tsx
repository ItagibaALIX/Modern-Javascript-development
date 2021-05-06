import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

import Avatar from 'components/Avatar';

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
    justifyContent: (props: { id: number }): string => (props.id ? 'flex-end' : 'flex-start'),
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
    backgroundColor: (props: { id: number }): string => (props.id ? theme.palette.primary.main : 'white'),
  },
  text: {
    color: (props: { id: number }): string => (props.id ? 'white' : theme.palette.text.primary),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',

    fontSize: 13,
    width: '100%',
    minWidth: '100%',
    height: 'auto',
  },
}));

function Message(props): JSX.Element {
  // const { lastMessage } = props;
  const { id } = props.m.user;
  const classes = useStyles({ id });

  return (
    <div className={classes.containerFlexPostion}>
      {
        props.m.user.id
          ? (
            <>
              <div className={classes.containerMessage}>
                <Typography
                  variant="subtitle1"
                  className={classes.text}
                >
                  {props.m.m}
                </Typography>
              </div>
              <Avatar user={props.m.user} withName={false} />
            </>
          )
          : (
            <>
              <Avatar user={props.m.user} withName={false} />
              <div className={classes.containerMessage}>
                <Typography
                  variant="subtitle1"
                  className={classes.text}
                >
                  {props.m.m}
                </Typography>
              </div>
            </>
          )
      }
    </div>
  );
}

function ChatMessage(props): JSX.Element {
  // const { lastMessage } = props;
  const classes = useStyles({ id: 1 });

  const messagesFormated = messages.map((m) => (
    <Message m={m} />
  ));

  return (
    <div className={classes.container}>
      <div className={classes.formContainer}>
        {messagesFormated}
      </div>
    </div>
  );
}

export default ChatMessage;

const messages = [
  {
    m: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: 'Excepteur sint occ',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'si architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia ',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 't is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious phy',

    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'ovident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est ',

    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: ' officiis debitis aut rerum necessita',

    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: 'stias excep',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'Ut enim ad minima veniam, quis nostrum exercitationem',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'non provident, similique sunt in culpa qui officia',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delec',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'similique sunt in culpa qui officia deserunt mollitia animi',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: 'obscure Latin words, consectetur, from a Lorem Ipsum',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: ' It uses a dictionary of over 200 Latin words, combined with a handful',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: 'totot',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'totot',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: 'totot',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: 'totot',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: 'totot',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'totot',
    user: {
      id: 0,
      username: 'Maxime',
      email: 'max@gmail.com',
    },
  },
  {
    m: 'totot',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
  {
    m: 'totot',
    user: {
      id: 1,
      username: 'Raphael',
      email: 'raph@gmail.com',
    },
  },
];
