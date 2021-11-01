import { ThemeProvider } from '@material-ui/core';
import { render } from '@testing-library/react';
import { Router, Switch, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import mockTheme from './mockTheme';
import { CurrentUserInfoProvider } from '../../shared/providers/CurrentUserInfoProvider';
import currentUserInfoReducer from '../../shared/reducers/currentUserInfoReducer';
import { PrivateRoute, Layout } from '../../shared/components';
import Registration from '../../pages/Registration';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';

export const history = createMemoryHistory();

const App = () => {
  const { currentUserInfoState, currentUserInfoDispatch } =
    currentUserInfoReducer();

  return (
    <ThemeProvider theme={mockTheme}>
      <Layout>
        <CurrentUserInfoProvider
          value={{
            currentUserInfoState,
            currentUserInfoDispatch,
          }}
        >
          <Router history={history}>
            <Switch>
              <Route path="/register" exact>
                <Registration />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <PrivateRoute path="/" exact>
                <Dashboard />
              </PrivateRoute>
            </Switch>
          </Router>
        </CurrentUserInfoProvider>
      </Layout>
    </ThemeProvider>
  );
};

const customRender = (ui: JSX.Element = <div />) =>
  render(ui, {
    wrapper: App,
  });

// override render method
export default customRender;
