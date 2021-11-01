import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

import { UserPayload } from '../../shared/types';

const useStyles = makeStyles(() => ({
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px',
  },
  formFieldContainer: {
    paddingBottom: '20px',
  },
  actionButtonContainer: {
    padding: '30px 0',
    display: 'flex',
    justifyContent: 'flex-end',

    '& button': {
      marginLeft: '20px',
      textTransform: 'none',
    },
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

interface Props {
  onSubmit(formData: UserPayload): void;
}

const LoginForm = ({ onSubmit }: Props) => {
  const classes = useStyles();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Email must be valid'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Grid container className={classes.formContainer}>
      <form
        onSubmit={formik.handleSubmit}
        onReset={formik.handleReset}
        data-testid="login-form"
      >
        <Grid item xs={12} className={classes.formFieldContainer}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            data-testid="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12} className={classes.formFieldContainer}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
            data-testid="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid item xs={12} className={classes.actionButtonContainer}>
          <Button
            color="primary"
            variant="outlined"
            type="reset"
            data-testid="reset-btn"
          >
            <Typography variant="body1">Reset</Typography>
          </Button>
          <Button
            color="primary"
            variant="contained"
            type="submit"
            data-testid="submit-btn"
            disabled={!(formik.isValid && formik.dirty)}
          >
            <Typography variant="body1">Log in</Typography>
          </Button>
        </Grid>
      </form>
      <Grid item xs={12} className={classes.linkContainer}>
        <Typography>
          Not registered yet? Register <Link to="/register">here</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
