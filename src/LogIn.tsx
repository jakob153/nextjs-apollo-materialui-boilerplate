import React, { FC, useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, TextField, makeStyles, Theme } from '@material-ui/core';

import { UserContext } from './UserContext';

import { LOGIN_MUTATION } from './LogIn.mutation';

import { SetAlert } from './interfaces/Alert';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginBottom1: {
    marginBottom: theme.spacing(1),
  },
  marginBottom2: {
    marginBottom: theme.spacing(2),
  },
}));

interface Props {
  handleClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined;
  setAlert: SetAlert;
}

interface LoginResponse {
  login: {
    user: {
      email: string;
    };
    errors: Array<{ path: string; message: string }>;
  };
}

const LogIn: FC<Props> = ({ setAlert, handleClose }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [logInMutation] = useMutation<LoginResponse>(LOGIN_MUTATION);
  const { setUser } = useContext(UserContext);
  const classes = useStyles();

  const { email, password } = form;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await logInMutation({ variables: { input: { email, password } } });
      if (response.errors) {
        const errorMessages = response.errors.map((error) => error.message);
        setAlert({
          variant: 'error',
          messages: [...errorMessages],
          show: true,
        });
        return;
      }
      if (handleClose && response.data) {
        handleClose({}, 'backdropClick');
        setUser({ email: response.data.login.user.email, loggedIn: true });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <form className={classes.marginTop2} action="POST" onSubmit={handleSubmit}>
      <TextField
        autoComplete="email"
        className={classes.marginBottom2}
        label="Email"
        type="email"
        name="email"
        onChange={handleChange}
        value={email}
        fullWidth
      />
      <TextField
        autoComplete="current-password"
        className={classes.marginBottom1}
        label="Password"
        type="password"
        name="password"
        onChange={handleChange}
        value={password}
        fullWidth
      />
      <Link component={RouterLink} to="/resetPassword">
        Forgot Password?
      </Link>
      <Button type="submit" disabled={!(email && password)} fullWidth>
        Log In
      </Button>
    </form>
  );
};

export default LogIn;
