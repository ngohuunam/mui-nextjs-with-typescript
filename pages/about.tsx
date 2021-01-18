import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import Copyright from '../src/Copyright';

export default function About() {
  return (
    <Container maxWidth="sm">
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          About page
        </Typography>
        <Link href="/">Go to the main page</Link>
        <Link href="/profile">Go to the Profile page</Link>
        <Link href="/login">Go to the Login page</Link>
        <Copyright />
      </Box>
    </Container>
  );
}
