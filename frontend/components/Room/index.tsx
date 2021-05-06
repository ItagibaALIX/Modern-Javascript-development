import { Typography, Avatar as MuiAvatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Avatar from 'components/Avatar';

import { User } from '../../types';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export interface RoomProps {
  user: User;
}

function Room(props: RoomProps): JSX.Element {
  const {
    user,
  } = props;
  const styles = useStyles({ name: user?.username ?? '' });

  return (
    <div className={styles.container}>
      <Avatar user={user} withName={false} />
    </div>
  );
}

export default Room;
