import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { useAuth } from '../provider/auth/auth-provider-hook';
import { useEffect, useState } from 'react';
import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Copyright from '../src/Copyright';
import Link from '../src/Link';

export default function Login() {
  const { firebaseClient } = useAuth();
  const [isFirebaseClientReady, setIsFirebaseClientReady] = useState(false);

  useEffect(() => setIsFirebaseClientReady(firebaseClient?.auth() ? true : false), []);

  return (
    <Container maxWidth='sm'>
      <Box>
        {isFirebaseClientReady ? <FirebaseAuth fpc={firebaseClient} /> : <CircularProgress />}
        <Link href="/">Go to the main page</Link>
        <Copyright />
      </Box>
    </Container>
  );
}
