import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  makeStyles,
  Theme,
  Snackbar,
} from '@material-ui/core';
import { useMutation } from '@apollo/client';

import { SIGNUP } from './SignUp.mutation';

import { SnackbarState } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginBottom2: {
    marginBottom: theme.spacing(2),
  },
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  marginBottom4: {
    marginBottom: theme.spacing(7),
  },
}));

const SignUp: FC = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    message: '',
    show: false,
  });
  const classes = useStyles();
  const [signUpMutation] = useMutation(SIGNUP, {
    onCompleted: () => {
      setSnackbar({
        message: 'A Confirmation Link was sent to your Mail.',
        show: true,
      });
    },
  });

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

  const validateForm = (password: string, password2: string) => {
    const messages = [];

    if (password.length < 5) {
      messages.push('Password must have at least 6 characters');
    } else if (password !== password2) {
      messages.push('Passwords do not match');
    }

    return { formValid: !messages.length, messages };
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validateFormResult = validateForm(form.password, form.password2);

    if (!validateFormResult.formValid) {
      setSnackbar({
        message: validateFormResult.messages.join('\n'),
        show: true,
      });

      return;
    }

    signUpMutation({
      variables: {
        username: form.username,
        email: form.email,
        password: form.password,
      },
    });
  };

  return (
    <>
      <form className={classes.marginTop2} onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          type="text"
          className={classes.marginBottom3}
          onChange={handleChange}
          value={form.username}
          fullWidth
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          className={classes.marginBottom3}
          onChange={handleChange}
          value={form.email}
          fullWidth
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          className={classes.marginBottom3}
          onChange={handleChange}
          value={form.password}
          fullWidth
        />
        <TextField
          name="password2"
          label="Confirm Password"
          type="password"
          className={classes.marginBottom4}
          onChange={handleChange}
          value={form.password2}
          fullWidth
        />
        <Box marginBottom={4}>
          <Button
            type="submit"
            disabled={
              !(form.username && form.email && form.password && form.password2)
            }
            variant="contained"
            fullWidth
          >
            Sign Up
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

export default SignUp;
