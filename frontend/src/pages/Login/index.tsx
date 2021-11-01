import { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { FormContainer, Loader } from '../../shared/components';
import LoginForm from './LoginForm';
import { UserPayload } from '../../shared/types';
import useLoginUser from '../../shared/hooks/useLoginUser';
import { useCurrentUserInfoContext } from '../../shared/providers/CurrentUserInfoProvider';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '700px',
  },
}));

const Login = () => {
  const classes = useStyles();

  const history = useHistory();

  const { currentUserInfoState, currentUserInfoDispatch } =
    useCurrentUserInfoContext();

  const { loginUser } = useLoginUser(currentUserInfoDispatch);

  useEffect(() => {
    if (!currentUserInfoState.loading && currentUserInfoState?.data?.email) {
      history.push('/');
    }
  }, [currentUserInfoState, history]);

  return (
    <Grid container className={classes.mainContainer}>
      {currentUserInfoState.loading && <Loader overlay={true} />}
      <FormContainer>
        <LoginForm
          onSubmit={(userPayload: UserPayload) => loginUser(userPayload)}
        />
      </FormContainer>
    </Grid>
  );
};

export default Login;
