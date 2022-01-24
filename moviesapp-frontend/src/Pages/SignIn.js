import * as React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '../modules/components/Typography';
import AppFooter from '../modules/views/AppFooter';
import AppAppBar from '../modules/views/AppAppBar';
import AppForm from '../modules/views/AppForm';
import { email, required } from '../modules/form/validation';
import RFTextField from '../modules/form/RFTextField';
import FormButton from '../modules/form/FormButton';
import FormFeedback from '../modules/form/FormFeedback';
import withRoot from '../modules/withRoot';
import IP from '../Utils/config';
import { NotificationManager } from "react-notifications";

const SignIn = (props) => {
  const [sent, setSent] = React.useState(false);
  const validate = (values) => {
    const errors = required(['name', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = (values) => {
    setSent(true);
    try {
      fetch(IP.api_endpoint + "auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.name,
          password: values.password,
          //   brand:state.brand,
          //  machineType:state.type,
        }),
      })
        .then((response) => response.json())
        .then(async (response) => {
          setSent(false);
          console.log(`response ------------> `, response);
          if (!response.statusCode) {
            //   notify("Added Successfully");
            localStorage.removeItem("userId")
            localStorage.removeItem("username")
            localStorage.setItem("userId", response.userId);
            localStorage.setItem("username", response.username);
            window.location.href = "/home";
            setSent(false);
          } else {
            NotificationManager.error(
              response.message
          );
          }
        })
        .catch((err) => {
          setSent(false);
          console.log("err", err);
        });
    } catch (error) {
      setSent(false);
      console.log(`error ------------> `, error);
    }

  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>

          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link
              href="/sign-up"
              align="center"
              underline="always"
            >
              Sign Up here
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Field
                autoComplete="name"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Name"
                margin="normal"
                name="name"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgot-password/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignIn);
