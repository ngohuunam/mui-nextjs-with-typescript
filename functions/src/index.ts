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

export const newUserToFS = functions
  .region('asia-east2')
  .auth.user()
  .onCreate((user) => {
    const { providerData, email, emailVerified, phoneNumber } = user;
    const providerDataToJson = JSON.parse(JSON.stringify(providerData[0]));
    const data = { ...defaultUser, ...{ emailVerified }, ...providerDataToJson };
    data.createdAt = admin.firestore.Timestamp.now().toMillis();
    console.log(data);
    return admin
      .firestore()
      .collection('users') // @ts-ignore
      .doc(email || phoneNumber)
      .set(data)
      .catch((e) => console.error(e));
  });

export const removeUserToFS = functions
  .region('asia-east2')
  .auth.user()
  .onDelete((user) => {
    const { email, phoneNumber } = user;
    return admin
      .firestore()
      .collection('users') // @ts-ignore
      .doc(email || phoneNumber)
      .delete()
      .catch((e) => console.error(e));
  });
