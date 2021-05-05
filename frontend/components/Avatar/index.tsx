import { Typography, Avatar as MuiAvatar } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

import { User } from '../../types';

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i) {
  // eslint-disable-next-line no-bitwise
  const c = (i & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
}

interface StyledProps {
  name: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picture: {
    marginRight: theme.spacing(1),
    backgroundColor: (props: StyledProps) => `#${intToRGB(hashCode(props.name))}`,
    opacity: 0.8,
  },
  name: {
    fontSize: 16,
  },
}));

export interface AvatarProps {
  classes?: {
    container?: string,
    picture?: string,
    name?: string,
  };
  user: User;
  withName?: boolean
}

function Avatar(props: AvatarProps): JSX.Element {
  const {
    user,
    classes,
    withName = true,
  } = props;
  const styles = useStyles({ name: user?.username ?? '' });
  const containerClass = clsx(styles.container, classes?.container);
  const pictureClass = clsx(styles.picture, classes?.picture);
  const nameClass = clsx(styles.name, classes?.name);

  return (
    <div className={containerClass}>
      <MuiAvatar
        data-testid="user-avatar"
        alt="user-avatar"
        src=""
        className={pictureClass}
      >
        {user?.username?.[0].toUpperCase()}
      </MuiAvatar>
      { withName && <Typography className={nameClass} variant="body1">{user?.username}</Typography> }
    </div>
  );
}

export default Avatar;
