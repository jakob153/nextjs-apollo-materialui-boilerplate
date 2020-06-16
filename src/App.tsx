import React, { FC, ComponentType, useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import qs from 'qs';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/link-context';
import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import Dashboard from './pages/Dashboard';
import Main from './pages/Main';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';

import {
  UserContext,
  UserContextProvider,
} from './components/user/UserContext';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: blue,
  },
});

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  condition: boolean;
}

const App: FC = () => {
  const { user } = useContext(UserContext);
  const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const http = createHttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API,
  });

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${user.authToken}`,
    },
  }));

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(http),
  });

  const PrivateRoute: FC<PrivateRouteProps> = ({
    component: Component,
    condition,
    ...rest
  }) => (
    <Route
      {...rest}
      render={(props) =>
        condition ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );

  return (
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <UserContextProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/resetPassword" component={ResetPassword} />
              <PrivateRoute
                exact
                path="/dashboard"
                condition={user.loggedIn}
                component={Dashboard}
              />
              <PrivateRoute
                exact
                path="/resetPasswordConfirm"
                condition={!!params?.emailToken}
                component={ResetPasswordConfirm}
              />
              <Redirect to="/" />
            </Switch>
          </Router>
        </UserContextProvider>
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

export default App;
