import firebase from 'firebase/app';

declare namespace firebase {
  export interface UserInfo {
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string;
    providerId: string;
    /**
     * The user's unique ID.
     */
    uid: string;
  }
}
