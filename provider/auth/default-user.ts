export interface defaultUserITF {
  name: string | undefined | null;
  displayName: string | undefined | null;
  email: string | undefined | null;
  emailVerified: string | undefined | null;
  phoneNumber: number | string | undefined | null;
  photoURL: string | undefined | null;
  providerId: string | undefined | null;
  uid: string | undefined | null;
  active: boolean;
  banned: boolean;
  birthDay: number | string | undefined | null;
  thuongTru: string | undefined | null;
  cccd: string | undefined | null;
  phong: string | undefined | null;
  hoSo: string | undefined | null;
  loaiXe: string | undefined | null;
  bienSo: string | undefined | null;
  xeTret: boolean;
  vanTay: string | undefined | null;
  createdAt: number;
  lastEdit: number;
}

export const defaultUser: defaultUserITF = {
  name: '',
  displayName: '',
  email: '',
  emailVerified: '',
  phoneNumber: '',
  photoURL: '',
  providerId: '',
  uid: '',
  active: false,
  banned: false,
  birthDay: '',
  thuongTru: '',
  cccd: '',
  phong: '',
  hoSo: '',
  loaiXe: '',
  bienSo: '',
  xeTret: false,
  vanTay: '',
  createdAt: 0,
  lastEdit: 0,
};
