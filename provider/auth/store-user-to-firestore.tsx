import firebase from 'firebase/app';
import { defaultUser } from './default-user';

export const storeUserToFirestore = async (user: any) => {
  const { providerData, email, emailVerified, phoneNumber } = user;
  console.log(JSON.parse(JSON.stringify(user)));
  try {
    const doc = await firebase
      .firestore()
      .collection('users')
      .doc(email || phoneNumber);
    const docData = await doc.get();
    if (!docData.exists) {
      const data = { ...defaultUser, ...{ emailVerified }, ...providerData[0] };
      await doc.set(data);
    }
  } catch (e) {
    console.error(e.messsage);
  }
};
