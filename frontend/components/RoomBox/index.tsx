import { Typography, Avatar as MuiAvatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Avatar from 'components/Avatar';
import { useMessageContext } from 'components/Provider/Message';

import { User, Room } from '../../types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: "column",
    alignItems: 'flex-start',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: theme.palette.text.secondary,
      cursor: 'pointer',
    },
    padding: theme.spacing(2),
    width: "100%", 
  },
  room: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(1),
    width: '100%'
  },
  roomName: {
    fontSize: 14,
  },
  line: {
    border: `solid 1px ${theme.palette.primary.main}`,
    width: '100%',
  },
  noLine: {
    border: `solid 1px rgba(0, 0, 0, 0)`,
    width: '100%',
  },
}));

export interface RoomProps {
  user: User;
  room: Room;
}

function RoomBox(props: RoomProps): JSX.Element {
  const {
    user,
    room,
  } = props;
  const styles = useStyles({ name: user?.username ?? '' });
  const { currentRoom, setCurrentRoom } = useMessageContext();
  const roomSelected = room.name.localeCompare(currentRoom?.name);

  console.log("roomSelected", roomSelected);

  const onClick = () => {
    setCurrentRoom(room);
    // console.log('click click');
  };

  return (
      <div className={styles.container} onClick={onClick}>
        <div className={styles.room}>
          <Avatar name={room.name} withName={false} size="medium" />
          <Typography className={styles.roomName} variant="body1">
            {room.name}
          </Typography>
        </div>
        {
          roomSelected == 0 ?
            (<div className={styles.line} />) : (<div className={styles.noLine} />)
        }
      </div>
  );
}

export default RoomBox;
