import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import { Box, Button, TextField, makeStyles, Theme } from '@material-ui/core';
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
  marginBottom3: {
    marginBottom: theme.spacing(3),
  },
  marginBottom4: {
    marginBottom: theme.spacing(7),
  },
}));

interface Props {
  setAlert: Dispatch<SetStateAction<AlertState>>;
}

const SignUp: FC<Props> = ({ setAlert }) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const classes = useStyles();
  const [signUpMutation] = useMutation(SIGNUP_MUTATION);

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validateFormResult = validateForm(form.password, form.password2);

    if (!validateFormResult.formValid) {
      setAlert({
        severity: 'error',
        message: validateFormResult.messages.join('\n'),
        show: true,
      });
      return;
    }
    try {
      await signUpMutation({
        variables: {
          username: form.username,
          email: form.email,
          password: form.password,
        },
      });

      setAlert({
        severity: 'success',
        message: 'A Confirmation Link was sent to your Mail.',
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
        name="username"
        label="Username"
        type="text"
        className={classes.marginBottom3}
        onChange={handleChange}
        value={form.username}
        variant="outlined"
        fullWidth
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        className={classes.marginBottom3}
        onChange={handleChange}
        value={form.email}
        variant="outlined"
        fullWidth
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        className={classes.marginBottom3}
        onChange={handleChange}
        value={form.password}
        variant="outlined"
        fullWidth
      />
      <TextField
        name="password2"
        label="Confirm Password"
        type="password"
        className={classes.marginBottom4}
        onChange={handleChange}
        value={form.password2}
        variant="outlined"
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
  );
};

export default SignUp;
