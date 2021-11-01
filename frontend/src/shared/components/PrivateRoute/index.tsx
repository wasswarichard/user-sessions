import { Route, Redirect } from 'react-router-dom';

import { useCurrentUserInfoContext } from '../../providers/CurrentUserInfoProvider';

const PrivateRoute = ({ children, ...rest }: any) => {
  const { currentUserInfoState } = useCurrentUserInfoContext();

  return (
    <Route
      {...rest}
      render={() => {
        return currentUserInfoState?.data?.email ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
