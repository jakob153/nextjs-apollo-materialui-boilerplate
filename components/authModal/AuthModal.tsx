import React, { ChangeEvent, FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab as TabComponent,
  Tabs,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import LogIn from './LogIn';
import SignUp from './SignUp';

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
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setTab(newValue);
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
        {tab === Tab.LogIn && <LogIn handleClose={handleClose} />}
        {tab === Tab.SignUp && <SignUp />}
      </DialogContent>
      <IconButton className={classes.closeButton} onClick={handleClose}>
        <Close />
      </IconButton>
    </Dialog>
  );
};

export default AuthModal;
