import React, { useEffect, useRef, useState } from 'react';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useUser } from 'hooks/auth';

import MenuItemLink from 'components/Layout/Header/RightNav/UserCard/MenuItemLink';
import Avatar from 'components/Avatar';
import { useUserContext } from 'components/Provider/User';

const useStyles = makeStyles((theme) => ({
  card: {
    cursor: 'pointer',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: 6,
    paddingRight: 0,
    outline: 'none',
    backgroundColor: 'transparent',
  },
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: `0 ${theme.spacing(1)}px`,
  },
  logout: {
    fontWeight: 'bold',
    color: theme.palette.error.main,
  },
  optionContainer: {
    '& .MuiList-root': {
      padding: 0,
    },
    backgroundColor: theme.palette.grey[200],
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    width: 150,
  },
  option: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  avatar: {
    width: 40,
    height: 40,
  },
  popper: {
    zIndex: 1301,
  },
}));

function UserCard(): JSX.Element {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const classes = useStyles();
  const getUser = useUser();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!user) {
      getUser().then((newUser) => (
        setUser(newUser)
      )).catch((e) => {
        console.log(e);
      });
    }
  }, []);

  if (!user) {
    return null;
  }

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<HTMLLIElement | Document, MouseEvent>): void => {
    if (anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <button
        className={classes.card}
        type="button"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        data-testid="user-menu"
      >
        <Avatar
          classes={{ picture: classes.avatar }}
          name={user}
          withName={false}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        transition
        placement="bottom-start"
        className={classes.popper}
      >
        {({ TransitionProps }): JSX.Element => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'top' }}
          >
            <div className={classes.optionContainer}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow">
                  <MenuItemLink
                    className={classes.option}
                    onClick={handleClose}
                    href="/user/[params]"
                    as={`/user/${user.id}`}
                  >
                    Profile
                  </MenuItemLink>
                  <MenuItemLink
                    className={classes.option}
                    onClick={handleClose}
                    href="/settings"
                  >
                    Settings
                  </MenuItemLink>
                </MenuList>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default UserCard;
