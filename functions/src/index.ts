import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { defaultUser } from './default-user';

// firebase deploy --only functions

admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


export const createFirestoreUser = functions.auth.user().onCreate((user) => {
  const { providerData, email, emailVerified, phoneNumber } = user;
  const data = { ...defaultUser, ...{ emailVerified }, ...providerData[0] };
  data.createdAt = admin.firestore.Timestamp.now().toMillis();
  return admin
    .firestore()
    .collection('users') // @ts-ignore
    .doc(email || phoneNumber)
    .set(data);
});
