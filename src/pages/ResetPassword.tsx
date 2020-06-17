import React, { Dispatch, FC, SetStateAction, useState } from 'react';
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

const ResetPassword: FC<Props> = ({ setAlert }) => {
  const [form, setForm] = useState({ username: '', email: '' });
  const classes = useStyles();
  const [resetPassword] = useMutation<ResetPasswordResponse>(
    RESET_PASSWORD_MUTATION
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await resetPassword({
        variables: { username: form.username, email: form.email },
      });
      setAlert({
        variant: 'success',
        messages: ['Mail was sent successfully'],
        show: true,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
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
