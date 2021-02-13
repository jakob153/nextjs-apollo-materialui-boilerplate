import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
  Button,
  Paper,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';

import { SEND_CHANGE_PASSWORD_MAIL } from './SendChangePasswordMail.mutation';

import { SnackbarState } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  marginBottom5: {
    marginBottom: theme.spacing(5),
  },
}));

const RequestChangePassword: FC = () => {
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    show: false,
  });
  const classes = useStyles();

  const [sendChangePasswordMail] = useMutation<boolean, { email: string }>(
    SEND_CHANGE_PASSWORD_MAIL,
    {
      onCompleted: () => {
        setSnackbar({
          message:
            'A Password Reset Link was sent was sent to your mail address.',
          show: true,
        });
      },
      onError: () => {
        setSnackbar({
          message: 'Something went wrong!',
          show: true,
        });
      },
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendChangePasswordMail({
      variables: { email },
    });
  };

  return (
    <>
      <Typography className={classes.title} variant="h5" align="center">
        Reset Your Password
      </Typography>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="email"
            className={classes.marginBottom5}
            label="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            disabled={email === ''}
            variant="contained"
            fullWidth
          >
            Send change password mail
          </Button>
        </form>
      </Paper>
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

export default RequestChangePassword;
