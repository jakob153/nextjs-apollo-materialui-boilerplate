import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { Snackbar } from '@material-ui/core';

import { RESET_PASSWORD_MUTATION } from './ResetPassword.mutation';

import { AlertState } from '../types';

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

interface Props {
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

const ResetPassword: FC<Props> = () => {
  const [form, setForm] = useState({ username: '', email: '' });
  const [alert, setAlert] = useState<AlertState>({
    severity: 'info',
    message: '',
    show: false,
  });
  const classes = useStyles();
  const [resetPassword] = useMutation<ResetPasswordResponse>(
    RESET_PASSWORD_MUTATION
  );

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
        setAlert({
          severity: 'success',
          message:
            'A Password Reset Link was sent was sent to your mail address.',
          show: true,
        });
      }
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Something went wrong!',
        show: true,
      });
    }
  };

  const handleAlertClose = () => {
    setAlert((prevState) => ({ ...prevState, show: false }));
  };

  return (
    <Container maxWidth="xs">
      <Typography className={classes.title} variant="h5" align="center">
        Reset Your Password
      </Typography>
      {alert.show && (
        <Snackbar
          className={classes.alert}
          onClose={handleAlertClose}
          autoHideDuration={5000}
          message={alert.message}
        />
      )}
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
    </Container>
  );
};

export default ResetPassword;
