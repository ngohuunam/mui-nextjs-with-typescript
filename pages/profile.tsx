import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import nookies from 'nookies'
import { firebaseAdmin } from "../provider/firebase/firebase-admin";
// import { firebaseClient } from "../provider/firebase/firebase-client";

import { GetServerSideProps, InferGetServerSidePropsType, GetServerSidePropsContext } from "next";

const Profile = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => (
  <Container maxWidth='sm'>
    <Box>
      <Typography variant='h4' component='h4' gutterBottom>
        {props.message!}
      </Typography>
      <Link href='/'>Go to the main page</Link>
      <ProTip />
      <Copyright />
    </Box>
  </Container>
);


export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid, email, phone_number } = token;

    // the user is authenticated!
    // FETCH STUFF HERE

    return {
      props: { message: `Your ${email ? 'email' : phone_number ? 'Phone' : 'Sth wrong'} is ${email || phone_number} and your UID is ${uid}.` },
    };
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      // `as never` is required for correct type inference
      // by InferGetServerSidePropsType below
      props: {} as never,
    };
  }
};

export default Profile