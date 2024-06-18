import {Platform} from 'react-native';
export interface LoginDTO {
  username: string;
  password: string;
}
export interface ChangePwdDTO {
  oldPassword: string;
  newPassword: string;
}
export interface SignUpDTO {
  phoneNumber: string;
  password: string;
  fullName: string;
  confirmPassword: string;
  app: 'DELIVERY';
}
export interface ConfigDTO {
  app: 'DELIVERY';
  version: string;
  build: string | number;
  platform: Platform['OS'];
}
