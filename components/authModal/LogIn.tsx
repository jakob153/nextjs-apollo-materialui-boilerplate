import React, { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';

import Link from '../common/Link';

import { UserContext } from '../../context/UserContext';

import { SnackbarState } from '../../types';

import { LOGIN_MUTATION } from './LogIn.mutation';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginBottom1: {
    marginBottom: theme.spacing(1),
  },
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  marginBottom4: {
    marginBottom: theme.spacing(4),
  },
}));

interface Props {
  handleClose: () => void;
}

interface LoginResponse {
  logIn: {
    user: {
      username: string;
      email: string;
      authToken: string;
    };
    errors: Array<{ path: string; message: string }>;
  };
}

const LogIn: FC<Props> = ({ handleClose }) => {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    show: false,
  });
  const [logInMutation] = useMutation<LoginResponse>(LOGIN_MUTATION);
  const userContext = useContext(UserContext);
  const classes = useStyles();

  const handleSnackbar = () => {
    setSnackbar((prevState) => ({ ...prevState, show: false }));
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await logInMutation({
        variables: {
          usernameOrEmail: form.usernameOrEmail,
          password: form.password,
        },
      });

      if (!(handleClose && response.data)) {
        return;
      }

      userContext?.setUser({
        username: response.data.logIn.user.username,
        email: response.data.logIn.user.email,
        loggedIn: true,
        authToken: response.data.logIn.user.authToken,
      });

      handleClose();
    } catch (error) {
      console.error(error);
      setSnackbar({
        message: 'Invalid User Credentials',
        show: true,
      });
    }
  };

  return (
    <>
      <form
        className={classes.marginTop2}
        action="POST"
        onSubmit={handleSubmit}
      >
        <TextField
          autoComplete="email"
          className={classes.marginBottom3}
          label="Username Or Email"
          type="text"
          name="usernameOrEmail"
          onChange={handleChange}
          value={form.usernameOrEmail}
          fullWidth
        />
        <TextField
          autoComplete="current-password"
          className={classes.marginBottom1}
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={form.password}
          fullWidth
        />
        <Typography className={classes.marginBottom4}>
          <Link href="/resetPassword">Forgot Password?</Link>
        </Typography>
        <Box marginBottom={4}>
          <Button
            type="submit"
            disabled={!(form.usernameOrEmail && form.password)}
            variant="contained"
            fullWidth
          >
            Log In
          </Button>
        </Box>
      </form>
      <Snackbar
        open={snackbar.show}
        onClose={handleSnackbar}
        message={snackbar.message}
      />
    </>
  );
};

export default LogIn;