import FirebaseAuth from '../components/Auth/FirebaseAuth';
import { useAuth } from '../provider/auth/auth-provider-hook';
import { useEffect, useState } from 'react';
import React from 'react';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';

export default function Register() {
  const { firebaseClient } = useAuth();
  const [isFirebaseClientReady, setIsFirebaseClientReady] = useState(false);

  useEffect(() => setIsFirebaseClientReady(firebaseClient?.auth() ? true : false), []);

  return (
    <Container maxWidth='sm'>
      <Box sx={{ py: 4 }}>
        {isFirebaseClientReady ? <FirebaseAuth fpc={firebaseClient} /> : <CircularProgress />}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
