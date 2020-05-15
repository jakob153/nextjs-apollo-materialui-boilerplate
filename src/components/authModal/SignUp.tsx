import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Button, TextField, makeStyles, Theme } from '@material-ui/core';
import { useMutation } from '@apollo/client';

import { AlertState } from '../../types';

import { SIGNUP_MUTATION } from './SignUp.mutation';

const useStyles = makeStyles((theme: Theme) => ({
  marginTop2: {
    marginTop: theme.spacing(2),
  },
  marginBottom2: {
    marginBottom: theme.spacing(2),
  },
  marginBottom4: {
    marginBottom: theme.spacing(4),
  },
}));

interface Props {
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

const SignUp: FC<Props> = ({ setAlert }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const classes = useStyles();
  const [signUpMutation] = useMutation(SIGNUP_MUTATION);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = (password: string, password2: string) => {
    let formValid = true;
    const messages = [];

    if (password.length < 5) {
      formValid = false;
      messages.push('Password must have at least 6 characters');
    } else if (password !== password2) {
      formValid = false;
      messages.push('Passwords do not match');
    }

    return { formValid, messages };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, password2 } = form;

    const { formValid, messages } = validateForm(password, password2);

    if (!formValid) {
      setAlert({ variant: 'error', messages, show: true });
      return;
    }
    try {
      await signUpMutation({ variables: { input: { email, password } } });
      setAlert({
        variant: 'success',
        messages: ['A Confirmation Link was sent to your Mail.'],
        show: true,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <form className={classes.marginTop2} onSubmit={handleSubmit}>
      <TextField
        name="email"
        label="Email"
        type="email"
        className={classes.marginBottom2}
        onChange={handleChange}
        value={form.email}
        fullWidth
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        className={classes.marginBottom2}
        onChange={handleChange}
        value={form.password}
        fullWidth
        required
      />
      <TextField
        name="password2"
        label="Confirm Password"
        type="password"
        className={classes.marginBottom4}
        onChange={handleChange}
        value={form.password2}
        fullWidth
        required
      />
      <Button
        type="submit"
        disabled={!(form.email && form.password && form.password2)}
        fullWidth
      >
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;
