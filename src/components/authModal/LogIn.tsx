import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useMutation } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Link,
  TextField,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';

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
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  marginBottom7: {
    marginBottom: theme.spacing(7),
  },
}));

interface Props {
  handleClose: () => void;
  setAlert: Dispatch<SetStateAction<AlertState>>;
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

      if (!(handleClose && response.data)) {
        return;
      }

      setUser({
        username: response.data.logIn.user.username,
        email: response.data.logIn.user.email,
        loggedIn: true,
        authToken: response.data.logIn.user.authToken,
      });

      handleClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <form className={classes.marginTop2} action="POST" onSubmit={handleSubmit}>
      <TextField
        autoComplete="email"
        className={classes.marginBottom3}
        label="Username Or Email"
        type="text"
        name="usernameOrEmail"
        onChange={handleChange}
        value={form.usernameOrEmail}
        variant="outlined"
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
        variant="outlined"
        fullWidth
      />
      <Typography className={classes.marginBottom7}>
        <Link component={RouterLink} to="/resetPassword">
          Forgot Password?
        </Link>
      </Typography>
      <Button
        type="submit"
        disabled={!(form.usernameOrEmail && form.password)}
        variant="contained"
        fullWidth
      >
        Log In
      </Button>
    </form>
  );
};

export default LogIn;
