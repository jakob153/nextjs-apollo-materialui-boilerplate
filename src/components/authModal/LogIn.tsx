import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Link, TextField, makeStyles, Theme } from '@material-ui/core';

import { UserContext } from '../user/UserContext';

import { AlertState } from '../../types';

import { LOGIN_MUTATION } from './LogIn.mutation';

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
  handleClose:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

interface LoginResponse {
  login: {
    user: {
      email: string;
      authToken: string;
    };
    errors: Array<{ path: string; message: string }>;
  };
}

const LogIn: FC<Props> = ({ setAlert, handleClose }) => {
  const [form, setForm] = useState({ usernameOrEmail: '', password: '' });
  const [logInMutation] = useMutation<LoginResponse>(LOGIN_MUTATION);
  const { setUser } = useContext(UserContext);
  const classes = useStyles();

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await logInMutation({
        variables: {
          input: {
            usernameOrEmail: form.usernameOrEmail,
            password: form.password,
          },
        },
      });
      if (handleClose && response.data) {
        handleClose({}, 'backdropClick');
        console.log(response.data);
        setUser({
          email: response.data.login.user.email,
          loggedIn: true,
          authToken: response.data.login.user.authToken,
        });
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
      <Link component={RouterLink} to="/resetPassword">
        Forgot Password?
      </Link>
      <Button
        type="submit"
        disabled={!(form.usernameOrEmail && form.password)}
        fullWidth
      >
        Log In
      </Button>
    </form>
  );
};

export default LogIn;
