import firebase from "firebase/app";
import "firebase/auth"; // If you need it
import "firebase/firestore"; // If you need it
import "firebase/storage"; // If you need it
import "firebase/analytics"; // If you need it
import "firebase/performance"; // If you need it

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const initFirebase = () => {
  if (typeof window !== "undefined" && !firebase.apps.length) {
    firebase.initializeApp(clientCredentials);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    // To enable analytics. https://firebase.google.com/docs/analytics/get-started
    if (
      process.env.ENV === "production" &&
      "measurementId" in clientCredentials
    ) {
      firebase.analytics();
      firebase.performance();
    }
    return firebase;
  }
  return firebase;
};

const firebaseClient = initFirebase();

export { firebaseClient };
