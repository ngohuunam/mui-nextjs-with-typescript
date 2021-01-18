import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';

const useStyles = makeStyles(() => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <div className={classes.mainWrap}>
      <Container>
        <Header />
        <Container maxWidth='sm'>
          <Box>
            <Typography variant='h4' component='h1' gutterBottom>Index page</Typography>
            <Grid container direction="column" alignItems="center">
              <Link href='/about' color='secondary'>Go to the about page</Link>
              <Link href="/profile">Go to the Profile page</Link>
              <Link href="/login">Go to the Login page</Link>
            </Grid>
            <Copyright />
          </Box>
        </Container>
      </Container>
    </div>
  );
}
