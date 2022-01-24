import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            sx={{ fontSize: 24 }}
          >
            {'THE MOVIE DATABASE'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {!localStorage.getItem("userId") && (
              <React.Fragment>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  href="/sign-in"
                  sx={rightLink}
                >
                  {'Sign In'}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  href="/sign-up"
                  sx={{ ...rightLink, color: 'secondary.main' }}
                >
                  {'Sign Up'}
                </Link>

              </React.Fragment>

            )}
            {localStorage.getItem("userId") && (

              <React.Fragment>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  sx={rightLink}
                >
                  {"Hi " +localStorage.getItem("username").toUpperCase()}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  href="/"
                  onClick={() => {
                    localStorage.removeItem("userId")
                    localStorage.removeItem("username")
                    window.location.href = "/";
                  }}
                  sx={{ ...rightLink, color: 'secondary.main' }}
                >
                  {'Log Out'}
                </Link>
              </React.Fragment>

            )}

          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
