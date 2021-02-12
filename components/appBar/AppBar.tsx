import React, { FC, useContext, useState } from 'react';
import {
  AppBar as AppBarMaterial,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';

import AuthModal from '../authModal/AuthModal';
import Link from '../common/Link';

import { UserContext } from '../context/UserContext';

import { LOG_OUT } from './LogOut.mutation';

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

  const [logOut] = useMutation(LOG_OUT);

  const handleClick = (selectedTab: number) => () => {
    setShowModal((prevState) => ({ open: !prevState.open, selectedTab }));
  };

  const handleClose = () => {
    setShowModal((prevState) => ({ open: !prevState.open, selectedTab: null }));
  };

  const handleLogout = () => {
    userContext?.setUser({
      username: '',
      email: '',
      loggedIn: false,
    });

    logOut();
  };

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
            {userContext?.user.loggedIn ? (
              <>
                <Button color="inherit" onClick={handleClick(0)}>
                  Log In
                </Button>
                <Button color="inherit" onClick={handleClick(1)}>
                  Sign Up
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </Toolbar>
        </AppBarMaterial>
      </Box>
      {showModal.selectedTab !== null && (
        <AuthModal
          open={showModal.open}
          selectedTab={showModal.selectedTab}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default AppBar;
