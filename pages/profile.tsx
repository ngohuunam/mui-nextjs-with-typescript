// import React from 'react';
import nookies from 'nookies'
import { firebaseAdmin } from "../provider/firebase/firebase-admin";
import Dashboard from '../components/Dashboard/Dashboard'

import { GetServerSideProps, GetServerSidePropsContext } from "next";

const Profile = () => <Dashboard />;

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