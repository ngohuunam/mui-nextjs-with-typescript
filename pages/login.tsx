import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { useAuth } from '../provider/auth/auth-provider-hook';
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Link from '../src/Link';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import firebase from "firebase/app";
import nookies from "nookies";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Login() {
  const router = useRouter();
  const classes = useStyles();
  const { user, firebaseClient } = useAuth();
  const [isFirebaseClientReady, setIsFirebaseClientReady] = useState(false);
  const [isPendingRedirect, setIsPendingRedirect] = useState(false);

  useEffect(() => setIsFirebaseClientReady(firebaseClient?.auth() ? true : false), []);

  const handleSuccessed = (user: firebase.User) => {
    user.getIdToken().then(token => {
      nookies.destroy(null, "token");
      nookies.set(null, "token", token, {})
      router.push('/profile');
    });
  }

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 10, mb: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/*
        // @ts-ignore */}
        <Avatar className={classes.avatar} src={user?.photoURL} >
          {!user && <LockOutlinedIcon />}
        </Avatar>
        <Typography component="h1" variant={user ? "body1" : "h5"}>
          {user?.email || user?.phoneNumber || 'Sign in'}
        </Typography>
      </Box>
      {isFirebaseClientReady ?
        <FirebaseAuth
          redirect={(isPending: boolean) => setIsPendingRedirect(isPending)}
          successed={(user: firebase.User) => handleSuccessed(user)}
          fpc={firebaseClient} /> : <CircularProgress />}
      {!isPendingRedirect &&
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Link href="/">
            <Button color="primary"> Main page </Button>
          </Link>
        </Box>
      }
    </Container >
  );
}
