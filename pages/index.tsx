import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Snackbar, Typography } from '@material-ui/core';

import Link from '../components/common/Link';

import { SnackbarState } from '../types';

const Index: FC = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    show: false,
  });
  const nextRouter = useRouter();

  useEffect(() => {
    if (nextRouter.query.confirmAccount) {
      setSnackbar({
        message:
          nextRouter.query.confirmAccount === 'true'
            ? 'Account Confirmed! You can now log in.'
            : 'Something went wrong.',
        show: true,
      });
    }

    if (nextRouter.query.confirmPasswordChange) {
      setSnackbar({
        message: 'Password Changed! You can now log in with your new Password.',
        show: true,
      });
    }
  }, []);

  const handleAlertClose = () => {
    setSnackbar((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <>
      <Typography variant="h5">Homesite</Typography>
      <Link href="/dashboard">GO TO PROTECTED ROUTE DASHBOARD</Link>
      <Snackbar
        open={snackbar.show}
        onClose={handleAlertClose}
        message={snackbar.message}
      />
    </>
  );
};

export default Index;
