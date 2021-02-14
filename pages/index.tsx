import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Snackbar, Typography } from '@material-ui/core';
import { useMutation } from '@apollo/client';

import Link from '../components/common/Link';

import { CONFIRM_ACCOUNT } from './ConfirmAccount.mutation';

import { SnackbarState } from '../types';

const Index: FC = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    show: false,
  });
  const router = useRouter();

  const [confirmAccount] = useMutation<boolean, { emailToken: string }>(
    CONFIRM_ACCOUNT,
    {
      onCompleted: () => {
        setSnackbar({
          message: 'Account Confirmed! You can now log in.',
          show: true,
        });

        router.replace('/');
      },
      onError: () => {
        setSnackbar({
          message: 'Something went wrong.',
          show: true,
        });
      },
    }
  );

  useEffect(() => {
    if (router.query.confirmAccount) {
      confirmAccount({
        variables: { emailToken: router.query.confirmAccount as string },
      });
    }
  }, [router, confirmAccount]);

  return (
    <>
      <Typography variant="h5">Homesite</Typography>
      <Link href="/dashboard">GO TO PROTECTED ROUTE DASHBOARD</Link>
      <Snackbar
        open={snackbar.show}
        onClose={() =>
          setSnackbar((prevState) => ({ ...prevState, show: false }))
        }
        message={snackbar.message}
      />
    </>
  );
};

export default Index;
