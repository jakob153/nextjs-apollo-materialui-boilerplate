import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  Box,
  Container,
  Typography,
  makeStyles,
  Theme,
} from '@material-ui/core';

import Navbar from '../components/navbar/Navbar';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const Dashboard: FC = () => {
  const classes = useStyles();
  const { data: booksData, error } = useQuery(
    gql`
      {
        book
      }
    `
  );

  if (error) {
    return <Box>{error.message}</Box>;
  }

  if (!booksData) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Typography className={classes.title} variant="h4">
          Protected Dashboard
        </Typography>
        <Typography variant="h6">
          Protected Api Data: {booksData.book}
        </Typography>
      </Container>
    </>
  );
};

export default Dashboard;
