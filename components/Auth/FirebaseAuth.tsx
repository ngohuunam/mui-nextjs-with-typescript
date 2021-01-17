import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase/app";
import nookies from "nookies";
import { useRouter } from "next/router";

const FirebaseAuth = ({ fpc }: { fpc: typeof firebase }) => {
  const router = useRouter();

  const firebaseAuthConfig = {
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
        user.getIdToken().then(token => {
          nookies.destroy(null, "token");
          nookies.set(null, "token", token, {})
          router.push('/profile');
        });
        return false;
      },
    },
  };
  const fbAuth = fpc.auth();

  return (
    <>
      <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={fbAuth} />
    </>
  );
};

export default FirebaseAuth;
