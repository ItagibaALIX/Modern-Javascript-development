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

function getSize(size: string): string {
  if (size === 'mini') {
    return '25px';
  }
  return '40px';
}

function getFontSize(size: number): number {
  if (size === 'mini') {
    return 12;
  }
  return 16;
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
    width: (props: { size: string }): string => getSize(props.size),
    height: (props: { size: string }): string => getSize(props.size),
    backgroundColor: (props: StyledProps) => `#${intToRGB(hashCode(props.name))}`,
    opacity: 0.8,
  },
  name: {
    fontSize: (props: { size: string }): number => getFontSize(props.size),
  },
  containerLetter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
}));

export interface AvatarProps {
  classes?: {
    container?: string,
    picture?: string,
    name?: string,
  };
  name: string;
  withName?: boolean
  size?: 'mini' | 'medium',
}

function Avatar(props: AvatarProps): JSX.Element {
  const {
    name,
    classes,
    withName = true,
    size = 'mini',
  } = props;
  const styles = useStyles({ name: name ?? '', size });
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
        <div className={styles.containerLetter}>
          <Typography className={nameClass} variant="body1">
            {name?.[0].toUpperCase()}
          </Typography>
        </div>
      </MuiAvatar>
      { withName && <Typography className={nameClass} variant="body1">{name}</Typography> }
    </div>
  );
}

export default Avatar;
