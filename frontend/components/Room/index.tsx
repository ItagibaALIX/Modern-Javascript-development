import { Typography, Avatar as MuiAvatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Avatar from 'components/Avatar';
import { useMessageContext } from 'components/Provider/Message';

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
  },
}));

export interface RoomProps {
  user: User;
  roomName: string;
}

function Room(props: RoomProps): JSX.Element {
  const {
    user,
    roomName = 'The secret conv',
  } = props;
  const styles = useStyles({ name: user?.username ?? '' });
  const { setCurrentRoom } = useMessageContext();

  const onClick = () => {
    setCurrentRoom(roomName);
    // console.log('click click');
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <Avatar name={roomName} withName={false} size="medium" />
      <Typography className={styles.roomName} variant="body1">
        {roomName}
      </Typography>
    </div>
  );
}

export default Room;
