import React, { useEffect } from "react";
import { useAuth } from '../provider/auth/auth-provider-hook';
import { useRouter } from "next/router";
import Container from '@material-ui/core/Container';

const Logout = () => {
  const { firebaseClient } = useAuth();
  const router = useRouter();

  useEffect(() => {
    firebaseClient
      .auth()
      .signOut()
      .then(() => router.push("/"));
  });

  return (
    <Container maxWidth='sm'>
      <div>Logging out...!!</div>;
    </Container>
  );
};

export default Logout;
