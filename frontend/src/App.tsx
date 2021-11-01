import { useEffect } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { useTheme } from './shared/theme';
import { Layout, Loader } from './shared/components';
import { CurrentUserInfoProvider } from './shared/providers/CurrentUserInfoProvider';
import useGetCurrentUserInfo from './shared/hooks/useGetCurrentUserInfo';
import currentUserInfoReducer from './shared/reducers/currentUserInfoReducer';
import Routes from './Routes';

const App = () => {
  const { theme } = useTheme();

  const { currentUserInfoState, currentUserInfoDispatch } =
    currentUserInfoReducer();

  const { getCurrentUserInfo } = useGetCurrentUserInfo(currentUserInfoDispatch);

  useEffect(() => {
    getCurrentUserInfo();
    // Disabling lint as getCurrentUserInfo cannot be used in the dep array
  }, [currentUserInfoDispatch]); // eslint-disable-line

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <CurrentUserInfoProvider
          value={{ currentUserInfoState, currentUserInfoDispatch }}
        >
          {currentUserInfoState.loading ||
          (!currentUserInfoState.data && !currentUserInfoState.error) ? (
            <Loader />
          ) : (
            <Routes />
          )}
        </CurrentUserInfoProvider>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
