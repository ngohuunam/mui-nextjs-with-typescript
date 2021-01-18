import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { useAuth } from '../provider/auth/auth-provider-hook';
import { useEffect, useState } from 'react';
import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '../src/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Login() {
  const classes = useStyles();
  const { firebaseClient } = useAuth();
  const [isFirebaseClientReady, setIsFirebaseClientReady] = useState(false);

  useEffect(() => setIsFirebaseClientReady(firebaseClient?.auth() ? true : false), []);

  return (
    <Container maxWidth='sm'>
      <Box mt={10} display="flex" flexDirection="column" alignItems="center">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {isFirebaseClientReady ? <FirebaseAuth fpc={firebaseClient} /> : <CircularProgress />}
        <Link href="/">
          <Button color="primary"> Go back </Button>
        </Link>
      </Box>
    </Container>
  );
}
