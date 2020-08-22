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

import { RESET_PASSWORD_MUTATION } from './ResetPassword.mutation';

import { SnackbarState } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
  marginBottom5: {
    marginBottom: theme.spacing(5),
  },
}));

interface ResetPasswordResponse {
  resetPassword: {
    success: boolean;
    errors: Array<{ path: string; message: string }>;
  };
}

const ResetPassword: FC = () => {
  const [form, setForm] = useState({ username: '', email: '' });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    show: false,
  });
  const classes = useStyles();

  const [resetPassword] = useMutation<ResetPasswordResponse>(
    RESET_PASSWORD_MUTATION
  );

  const handleSnackbar = () => {
    setSnackbar((prevState) => ({ ...prevState, show: false }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await resetPassword({
        variables: { username: form.username, email: form.email },
      });

      if (!response.errors?.length) {
        setSnackbar({
          message:
            'A Password Reset Link was sent was sent to your mail address.',
          show: true,
        });
      }
    } catch (error) {
      setSnackbar({
        message: 'Something went wrong!',
        show: true,
      });
    }
  };

  return (
    <>
      <Typography className={classes.title} variant="h5" align="center">
        Reset Your Password
      </Typography>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            className={classes.marginBottom5}
            label="Username"
            type="text"
            onChange={handleChange}
            value={form.username}
            variant="outlined"
            fullWidth
          />
          <TextField
            name="email"
            className={classes.marginBottom5}
            label="Email"
            type="email"
            onChange={handleChange}
            value={form.email}
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            disabled={!(form.username && form.email)}
            variant="contained"
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.show}
        onClose={handleSnackbar}
        message={snackbar.message}
      />
    </>
  );
};

export default ResetPassword;
