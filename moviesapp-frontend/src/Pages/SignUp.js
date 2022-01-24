import *  as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
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


function SignUp() {
  const [sent, setSent] = React.useState(false);
  const [state,setState] = React.useState({});

  const validate = (values) => {
    const errors = required(['name', 'country', 'email', 'password'], values);
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
    setSent(true);
    try {
      fetch(IP.api_endpoint + "auth/signup", {
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
                window.location.href="/sign-in";
              
               //   notify("Added Successfully");
              } else {
                NotificationManager.error(
                   response.message
              );
               //   notify("Failed To Add.");
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
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/sign-in" underline="always">
              Already have an account?
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
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                autoComplete="given-name"
                fullWidth
                label="Name"
                name="name"
                required
              />

              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />

              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="country"
                autoComplete="given-name"
                label="Country"
                type="Country"
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
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
}

export default withRoot(SignUp);
