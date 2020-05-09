import React, { useEffect, useState, FC } from 'react';
import { Container, makeStyles, Theme } from '@material-ui/core';
import Navbar from '../components/navbar/Navbar';
import qs from 'qs';
import { RouteChildrenProps } from 'react-router-dom';

import Alert from '../components/alert/Alert';

import { AlertState } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop4: {
    marginTop: theme.spacing(4),
  },
}));

const Main: FC<RouteChildrenProps> = ({ history }) => {
  const [alert, setAlert] = useState<AlertState>({ variant: 'info', messages: [], show: false });
  const classes = useStyles();

  useEffect(() => {
    const params = qs.parse(window.location.search.replace('?', ''));

    if (params?.confirmAccount) {
      setAlert({
        variant: params.confirmAccount === 'true' ? 'success' : 'error',
        messages: [
          params.confirmAccount === 'true'
            ? 'Account Confirmed! You can now log in.'
            : 'Something went wrong.',
        ],
        show: true,
      });
    }
  }, []);

  const handleAlertClose = () => {
    history.push(history.location.pathname);
    setAlert((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <>
      <Navbar />
      <Container>
        <h5>MAIN PAGE</h5>
      </Container>
      {alert.show && (
        <Alert
          className={classes.marginTop4}
          variant={alert.variant}
          messages={alert.messages}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default Main;
