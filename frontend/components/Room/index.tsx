import { Typography, Avatar as MuiAvatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Avatar from 'components/Avatar';

import { User } from '../../types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
      cursor: 'pointer',
    },
    padding: theme.spacing(2),
  },
  roomName: {
    fontSize: 14,
  }
}));

export interface RoomProps {
  user: User;
  // roomName: string;
}

function Room(props: RoomProps): JSX.Element {
  const {
    user,
    // roomName = "The secret conv",
  } = props;
  const styles = useStyles({ name: user?.username ?? '' });

  const onClick = () => {
    console.log("click click")
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <Avatar user={user} withName={false} size="medium"/>
      <Typography className={styles.roomName} variant="body1">
        {roomName}
      </Typography>
    </div>
  );
}

export default Room;
