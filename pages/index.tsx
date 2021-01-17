import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Grid from '@material-ui/core/Grid';

export default function Index() {
  return (
    <Container maxWidth='sm'>
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Index page
        </Typography>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Link href='/about' color='secondary'>
            Go to the about page
        </Link>
          <Link href="/profile">Go to the Profile page</Link>
          <Link href="/login">Go to the Login page</Link></Grid>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
