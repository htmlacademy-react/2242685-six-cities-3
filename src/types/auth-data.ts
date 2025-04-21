import { AuthorizationStatus } from '../const';
import { UserData } from './user-data';

export type AuthData = {
  email: string;
  password: string;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};
