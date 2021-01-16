import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { storeUserToFirestore } from '../../provider/auth/store-user-to-firestore';
import { useRouter } from 'next/router';
import { firebase } from '../../provider/firebase/firebase-client';


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
    // signInSuccessUrl: "/",
    credentialHelper: 'none',
    callbacks: {
      signInSuccessWithAuthResult: ({ user }: { user: firebase.User }) => {
        storeUserToFirestore(user).then(() => router.push('/profile'));
        return false;
      },
    },
  };
  const fbAuth = fpc.auth();

  return (
    <div>
      <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={fbAuth} />
    </div>
  );
};

export default FirebaseAuth;
