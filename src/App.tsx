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
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { CssBaseline, MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import Dashboard from './components/Dashboard';
import Main from './components/Main';
import ResetPassword from './components/resetPassword/ResetPassword';
import ResetPasswordConfirm from './components/resetPassword/ResetPasswordConfirm';

import { UserContext, UserContextProvider } from './components/user/UserContext';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
    secondary: blue,
  },
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_GRAPHQL_API,
    credentials: 'include',
  }),
});

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  condition: boolean;
}

const App: FC = () => {
  const { user } = useContext(UserContext);
  const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

  const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, condition, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (condition ? <Component {...props} /> : <Redirect to="/" />)}
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
