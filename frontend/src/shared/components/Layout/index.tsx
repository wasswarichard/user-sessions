import { Grid, makeStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack'; // provides an imperative API to show notification from any place

import Header from '../Header';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',

    '& .MuiCollapse-wrapper': {
      marginTop: '70px',
    },
  },
  contentContainer: {
    display: 'flex',
    padding: '0 200px',
  },
}));

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.mainContainer}>
      <SnackbarProvider maxSnack={1}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} className={classes.contentContainer}>
          {children}
        </Grid>
      </SnackbarProvider>
    </Grid>
  );
};

export default Layout;
