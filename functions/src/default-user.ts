export interface User {
  id: string;
  ten: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoURL: string;
  providerId: string;
  uid: string;
  ngaySinh: number | string;
  thuongTru: string;
  cccd: string;
  phong: string;
  hoSo: string;
  loaiXe: string;
  bienSo: string;
  choDeXe: string;
  vanTay: string;
  createdAt: number;
  lastEdit: number;
  status: string;
}

export const defaultUser: User = {
  id: '',
  ten: '',
  displayName: '',
  email: '',
  emailVerified: false,
  phoneNumber: '',
  photoURL: '',
  providerId: '',
  uid: '',
  ngaySinh: '',
  thuongTru: '',
  cccd: '',
  phong: '',
  hoSo: '',
  loaiXe: '',
  bienSo: '',
  choDeXe: '',
  vanTay: '',
  createdAt: 0,
  lastEdit: 0,
  status: 'new',
};
