import React, { useEffect, useState, FC } from 'react';
import qs from 'qs';
import { Button, Container, makeStyles, Theme } from '@material-ui/core';
import { gql, useLazyQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import Alert from '../components/alert/Alert';
import Navbar from '../components/navbar/Navbar';

import { AlertState } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop4: {
    marginTop: theme.spacing(4),
  },
}));

const Main: FC = () => {
  const [alert, setAlert] = useState<AlertState>({
    variant: 'info',
    messages: [],
    show: false,
  });
  const history = useHistory();
  const [getBooks] = useLazyQuery(
    gql`
      {
        book
      }
    `
  );
  const classes = useStyles();

  useEffect(() => {
    const params = qs.parse(history.location.search, {
      ignoreQueryPrefix: true,
    });

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
  }, [history.location.search]);

  const handleAlertClose = () => {
    history.push(history.location.pathname);
    setAlert((prevState) => ({ ...prevState, show: false }));
  };

  const handleBooks = () => {
    getBooks();
  };

  return (
    <>
      <Navbar />
      <Container>
        <h5>MAIN PAGE</h5>
        <Button variant="contained" onClick={handleBooks}>
          Get Books
        </Button>
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
