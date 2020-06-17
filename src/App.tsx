import React, { FC, ComponentType, useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import {
  CssBaseline,
  MuiThemeProvider,
  createMuiTheme,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

import ApolloProviderWithToken from './ApolloProviderWithToken';

import Dashboard from './pages/Dashboard';
import Main from './pages/Main';
import ResetPassword from './pages/ResetPassword';

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
    <UserContextProvider>
      <ApolloProviderWithToken>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
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
              <Redirect to="/" />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ApolloProviderWithToken>
    </UserContextProvider>
  );
};

export default App;
