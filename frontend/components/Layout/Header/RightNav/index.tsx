import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useUser } from 'hooks/auth';
import { useState, useEffect } from 'react';

import ButtonLink from 'components/ButtonLink';

import MobileMenu from './MobileMenu';
import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    padding: 0,
  },
  marginRight: {
    marginRight: theme.spacing(3),
  },
}));

function RightNav(): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const getUser = useUser();
  const classes = useStyles();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser().then((newUser) => (
      setUser(newUser)
    )).catch((e) => {
      console.log(e);
    });
  }, []);

  console.log('user', user);

  if (isMobile) {
    return (
      <MobileMenu />
    );
  }

  return (
    <>
      { user ? (<UserCard />) : (
        <div>
          <ButtonLink href="/login" className={classes.marginRight} variant="outlined">
            Sign in
          </ButtonLink>
          <ButtonLink href="/register" variant="contained">
            Sign up
          </ButtonLink>
        </div>
      )}
    </>
  );
}

export default RightNav;
