import React, { useEffect, useState, FC } from 'react';
import { Container, Snackbar, makeStyles, Theme } from '@material-ui/core';
import { useRouter } from 'next/router';

import Navbar from '../components/appBar/AppBar';
import Link from '../components/link/Link';

import { AlertState } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop4: {
    marginTop: theme.spacing(4),
  },
}));

const Main: FC = () => {
  const [alert, setAlert] = useState<AlertState>({
    message: '',
    show: false,
  });
  const classes = useStyles();
  const nextRouter = useRouter();

  useEffect(() => {
    if (nextRouter.query.confirmAccount) {
      setAlert({
        message:
          nextRouter.query.confirmAccount === 'true'
            ? 'Account Confirmed! You can now log in.'
            : 'Something went wrong.',
        show: true,
      });
    }

    if (nextRouter.query.confirmPasswordChange) {
      setAlert({
        message: 'Password Changed! You can now log in with your new Password.',
        show: true,
      });
    }
  }, [nextRouter.query]);

  const handleAlertClose = () => {
    setAlert((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <>
      <Navbar />
      <Container>
        <Snackbar
          open={alert.show}
          className={classes.marginTop4}
          onClose={handleAlertClose}
          message={alert.message}
        />
        <h5>MAIN PAGE</h5>
        <Link href="/dashboard">GO TO PROTECTED ROUTE DASHBOARD</Link>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      initialApolloState: {},
      authToken: '12312414421',
    },
  };
}

export default Main;
