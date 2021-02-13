import React, { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
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
import { useRouter } from 'next/router';

import { UserContext } from '../../components/context/UserContext';

import { CHANGE_PASSWORD } from './ChangePassword.mutation';

import { SnackbarState } from '../../types';

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

const ChangePassword: FC = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [form, setForm] = useState({ password: '', password2: '' });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    show: false,
  });
  const classes = useStyles();

  const [changePassword] = useMutation<
    boolean,
    { newPassword: string; changePasswordToken: string }
  >(CHANGE_PASSWORD, {
    onCompleted: () => {
      setSnackbar({
        message: 'Password changed',
        show: true,
      });

      router.push('/');
    },
    onError: () => {
      setSnackbar({
        message: 'Something went wrong!',
        show: true,
      });
    },
  });

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    changePassword({
      variables: {
        newPassword: form.password2,
        changePasswordToken: router.query.changePasswordToken as string,
      },
    });
  };

  if (user.loggedIn) {
    router.push('/');
  }

  return (
    <>
      <Typography className={classes.title} variant="h5" align="center">
        Change Your Password
      </Typography>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="new-password"
            name="password"
            className={classes.marginBottom5}
            label="Password"
            type="password"
            onChange={handleChange}
            value={form.password}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoComplete="new-password"
            name="password2"
            className={classes.marginBottom5}
            label="Confirm Password"
            type="password"
            onChange={handleChange}
            value={form.password2}
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            disabled={
              (form.password.length === 0 && form.password2.length === 0) ||
              form.password !== form.password2
            }
            variant="contained"
            fullWidth
          >
            Change password
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

export default ChangePassword;
