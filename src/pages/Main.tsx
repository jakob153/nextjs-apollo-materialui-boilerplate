import React, { useEffect, useState, FC } from 'react';
import qs from 'qs';
import {
  Container,
  Link,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import Navbar from '../components/navbar/Navbar';

import { AlertState } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop4: {
    marginTop: theme.spacing(4),
  },
}));

const Main: FC = () => {
  const [alert, setAlert] = useState<AlertState>({
    severity: 'info',
    message: '',
    show: false,
  });
  const history = useHistory();
  const classes = useStyles();
  const usedTheme = useTheme();
  console.log(usedTheme);

  useEffect(() => {
    const params = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    });

    if (params?.confirmAccount) {
      setAlert({
        severity: params.confirmAccount === 'true' ? 'success' : 'error',
        message:
          params.confirmAccount === 'true'
            ? 'Account Confirmed! You can now log in.'
            : 'Something went wrong.',
        show: true,
      });
    }

    if (params?.confirmPasswordChange) {
      setAlert({
        severity: 'success',
        message: 'Password Changed! You can now log in with your new Password.',
        show: true,
      });
    }
  }, [history.location.search]);

  const handleAlertClose = () => {
    history.push(history.location.pathname);
    setAlert((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <>
      <Navbar />
      <Container>
        {alert.show && (
          <Alert
            className={classes.marginTop4}
            severity={alert.severity}
            onClose={handleAlertClose}
          >
            {alert.message}
          </Alert>
        )}
        <h5>MAIN PAGE</h5>
        <Link component={RouterLink} to="/dashboard">
          GO TO PROTECTED ROUTE DASHBOARD
        </Link>
      </Container>
    </>
  );
};

export default Main;
