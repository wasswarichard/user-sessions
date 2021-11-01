import { Typography, Grid, makeStyles } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

import useLogoutUser from '../../shared/hooks/useLogoutUser';
import { useCurrentUserInfoContext } from '../../shared/providers/CurrentUserInfoProvider';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '700px',

    '& h4': {
      paddingBottom: '40px',
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const history = useHistory();

  const { currentUserInfoState, currentUserInfoDispatch } =
    useCurrentUserInfoContext();

  const { logoutUser } = useLogoutUser(currentUserInfoDispatch);

  const handleLogout = async () => {
    logoutUser();
    history.push('/login');
  };

  return (
    <Grid container className={classes.mainContainer}>
      <Typography
        variant="h4"
        data-testid="welcome-msg"
      >{`Welcome ${currentUserInfoState?.data?.fullName}`}</Typography>
      <Typography variant="body1">
        Click{' '}
        <Link to="#" onClick={handleLogout} data-testid="logout-link">
          here
        </Link>{' '}
        to logout
      </Typography>
    </Grid>
  );
};

export default Dashboard;
