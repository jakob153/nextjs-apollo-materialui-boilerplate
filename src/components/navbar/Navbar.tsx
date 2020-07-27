import React, { FC, useContext, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import AuthModal from '../authModal/AuthModal';

import { UserContext } from '../user/UserContext';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

interface ModalState {
  open: boolean;
  selectedTab: null | number;
}

const NavBar: FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState<ModalState>({
    open: false,
    selectedTab: null,
  });
  const classes = useStyles();

  const handleClick = (selectedTab: number) => () => {
    setShowModal((prevState) => ({ open: !prevState.open, selectedTab }));
  };

  const handleClose = () => {
    setShowModal((prevState) => ({ open: !prevState.open, selectedTab: null }));
  };

  const handleLogout = async () => {
    setUser({ username: '', email: '', loggedIn: false, authToken: '' });

    try {
      await fetch('/refreshToken', {
        method: 'DELETE',
        credentials: 'include',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { open, selectedTab } = showModal;

  const renderAuthButtons = () => (
    <>
      <Button color="inherit" onClick={handleClick(0)}>
        Log In
      </Button>
      <Button color="inherit" onClick={handleClick(1)}>
        Sign Up
      </Button>
    </>
  );

  const renderLogoutButton = () => (
    <Button color="inherit" onClick={handleLogout}>
      Log Out
    </Button>
  );

  return (
    <>
      <Box flexGrow={1}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link
                color="inherit"
                component={RouterLink}
                href="#"
                to="/"
                underline="none"
              >
                MyApp
              </Link>
            </Typography>
            {!user.loggedIn ? renderAuthButtons() : renderLogoutButton()}
          </Toolbar>
        </AppBar>
      </Box>
      {selectedTab !== null && (
        <AuthModal
          open={open}
          selectedTab={selectedTab}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default NavBar;
