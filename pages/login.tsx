import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { useAuth } from '../provider/auth/auth-provider-hook';
import { useEffect, useState } from 'react';
import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '../src/Link';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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
      <Box sx={{ mt: 10, mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Box>
      {isFirebaseClientReady ? <FirebaseAuth fpc={firebaseClient} /> : <CircularProgress />}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Link href="/">
          <Button color="primary"> Go back </Button>
        </Link>
      </Box>
    </Container >
  );
}
