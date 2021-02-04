import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import { User } from './default-user';

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
    const firestore = admin.firestore();
    const userCollectionRef = firestore.collection('users');
    return userCollectionRef
      .doc('default')
      .get()
      .then((doc) => {
        const defUser = doc.data();
        const { providerData: providerDatas, email, emailVerified, phoneNumber } = user;
        const providerData = providerDatas[0].toJSON();
        const id = email || phoneNumber;
        const data = { ...defUser as any, ...{ emailVerified, id }, ...{ providerData } };
        data.log.tao = { label: 'Đăng ký', ts: admin.firestore.Timestamp.now().toMillis() };
        return userCollectionRef // @ts-ignore
          .doc(id)
          .set(data)
          .catch((e) => console.error(e));
      })
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

// Listen for updates to any `user` document.
export const listenToUserDataUpdate = functions
  .region('asia-east2')
  .firestore.document('users/{userId}')
  .onUpdate((change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();
    const previousData = change.before.data();

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (data.rev === previousData.rev) return null;

    if (data.phong !== previousData.phong) {
      const roomRef = admin.firestore().collection(data.nha).doc(data.phong);
      return roomRef
        .get()
        .then((docSnap) => {
          const roomData = docSnap.data() || { phong: data.phong, status: 'inactive', users: [] };
          if (roomData.users.indexOf(data.id) > -1) return null;
          roomData.status = 'active';
          roomData.users.push(data.id);
          return roomRef.set(roomData).catch((e) => console.error(e));
        })
        .catch((e) => console.error(e));
    }

    return null;
  });
