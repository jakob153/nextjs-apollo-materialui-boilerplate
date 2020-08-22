import React, { FC, useContext, useState } from 'react';
import {
  AppBar as AppBarMaterial,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from '../link/Link';

import AuthModal from '../authModal/AuthModal';

import { UserContext } from '../../context/UserContext';

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

const AppBar: FC = () => {
  const userContext = useContext(UserContext);
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
    userContext?.setUser({
      username: '',
      email: '',
      loggedIn: false,
      authToken: '',
    });

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
        <AppBarMaterial position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link href="/" color="inherit">
                MyApp
              </Link>
            </Typography>
            {!userContext?.user.loggedIn
              ? renderAuthButtons()
              : renderLogoutButton()}
          </Toolbar>
        </AppBarMaterial>
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

export default AppBar;
