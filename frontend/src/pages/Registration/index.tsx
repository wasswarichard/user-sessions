import { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { FormContainer, Loader } from '../../shared/components';
import RegistrationForm from './RegistrationForm';
import { UserPayload } from '../../shared/types';
import useRegisterUser from '../../shared/hooks/useRegisterUser';
import { useCurrentUserInfoContext } from '../../shared/providers/CurrentUserInfoProvider';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '700px',
  },
}));

const Registration = () => {
  const classes = useStyles();

  const history = useHistory();

  const { currentUserInfoState, currentUserInfoDispatch } =
    useCurrentUserInfoContext();

  const { registerUser } = useRegisterUser(currentUserInfoDispatch);

  useEffect(() => {
    if (!currentUserInfoState.loading && currentUserInfoState?.data?.email) {
      history.push('/');
    }
  }, [currentUserInfoState, history]);

  return (
    <Grid container className={classes.mainContainer}>
      {currentUserInfoState.loading && <Loader overlay={true} />}
      <FormContainer>
        <RegistrationForm
          onSubmit={(userPayload: UserPayload) => registerUser(userPayload)}
        />
      </FormContainer>
    </Grid>
  );
};

export default Registration;
