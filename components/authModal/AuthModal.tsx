import React, { ChangeEvent, FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  Tab as TabComponent,
  Tabs,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import LogIn from './LogIn';
import SignUp from './SignUp';

import { AlertState } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    top: '1px',
    right: '1px',
  },
}));

enum Tab {
  LogIn,
  SignUp,
}

interface Props {
  open: boolean;
  handleClose: () => void;
  selectedTab: number;
}

const AuthModal: FC<Props> = ({ open, handleClose, selectedTab }) => {
  const [tab, setTab] = useState(selectedTab);
  const [alert, setAlert] = useState<AlertState>({
    message: '',
    show: false,
  });
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
    setAlert((prevState) => ({ ...prevState, show: false }));
  };

  const handleCloseAlert = () => {
    setAlert((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Tabs value={tab} onChange={handleChange}>
          <TabComponent label="Log In" />
          <TabComponent label="Sign Up" />
        </Tabs>
      </DialogTitle>
      <DialogContent>
        <Snackbar
          open={alert.show}
          className={classes.marginTop2}
          onClose={handleCloseAlert}
          message={alert.message}
        />
        {tab === Tab.LogIn && (
          <LogIn setAlert={setAlert} handleClose={handleClose} />
        )}
        {tab === Tab.SignUp && <SignUp setAlert={setAlert} />}
      </DialogContent>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <Close />
      </IconButton>
    </Dialog>
  );
};

export default AuthModal;
