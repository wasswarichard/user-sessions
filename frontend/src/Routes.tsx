import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute, PageNotFound } from './shared/components';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const Routes = () => {
  return (
    <Router>
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
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
