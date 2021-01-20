import { useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/app";
import { Props } from 'react-firebaseui';
import MySnackbars from '../Feedback/MySnackbars';
import { useAuth } from '../../provider/auth/auth-provider-hook';

const FirebaseAuth = ({ fpc, successed, redirect }: { fpc: typeof firebase, successed: any, redirect: any }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePendingRedirect = (isPending: boolean) => {
    redirect(isPending)
    setLoading(isPending)
  }

  const firebaseAuthConfig: Props["uiConfig"] = {
    // signInFlow: "popup",
    signInFlow: 'redirect',
    // Auth providers
    // https://github.com/firebase/firebaseui-web#configure-oauth-providers
    signInOptions: [
      fpc.auth.GoogleAuthProvider.PROVIDER_ID,
      fpc.auth.EmailAuthProvider.PROVIDER_ID,
      {
        provider: fpc.auth.PhoneAuthProvider.PROVIDER_ID,
        recaptchaParameters: {
          type: 'image', // 'audio'
          size: 'normal', // 'invisible' or 'compact'
          badge: 'bottomleft', //' bottomright' or 'inline' applies to invisible.
        },
        defaultCountry: 'VN',
        loginHint: '+84xxxxxxxxx',
        whitelistedCountries: ['VI', '+84'],
      },
    ],
    // signInSuccessUrl: '/profile',
    credentialHelper: 'none',
    callbacks: {
      signInSuccessWithAuthResult: ({ user }: { user: firebase.User }) => {
        successed(user)
        setLoading(false)
        return false;
      },
    },
  };
  const fbAuth = fpc.auth();

  return (
    <>
      <MySnackbars open={loading} message={`Logging in${user ? ' to another acc' : ''}, please wait...`} />
      <StyledFirebaseAuth uiCallback={(ui) => handlePendingRedirect(ui.isPendingRedirect())} uiConfig={firebaseAuthConfig} firebaseAuth={fbAuth} />
    </>
  );
};

export default FirebaseAuth;
