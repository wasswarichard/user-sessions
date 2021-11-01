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

const RegistrationForm = ({ onSubmit }: Props) => {
  const classes = useStyles();

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .trim()
      .required('Full name is required')
      .min(5, 'Full name must be atleast 5 characters'),
    email: yup
      .string()
      .required('Email is required')
      .email('Email must be valid'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d#?!@$%^&*-]{8,}$/,
        'Password must be atleast 8 characters and must contain atleast a digit and a character',
      ),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
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
        data-testid="registration-form"
      >
        <Grid item xs={12} className={classes.formFieldContainer}>
          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            label="Full name"
            data-testid="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </Grid>

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
            data-testid="password"
            type="password"
            autoComplete="off"
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
            disabled={!(formik.isValid && formik.dirty)}
            data-testid="submit-btn"
          >
            <Typography variant="body1">Register</Typography>
          </Button>
        </Grid>
      </form>
      <Grid item xs={12} className={classes.linkContainer}>
        <Typography>
          Already have an account? Log in <Link to="/login">here</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
