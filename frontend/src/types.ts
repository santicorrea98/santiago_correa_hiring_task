import { ADMIN_ROLE, USER_ROLE } from './constants';

export type UserRole = typeof USER_ROLE | typeof ADMIN_ROLE;

export type Action =
  | 'listProperties'
  | 'propertyDetails'
  | 'createProperty'
  | 'listUsers'
  | 'userDetail'
  | 'createUser';
export interface ActionOption {
  key: Action;
  label: string;
  isAdminOnly?: boolean;
}

export interface House {
  id: number;
  address: string;
  num_rooms: number;
  price: number;
}

export interface User {
  id: number;
  username: string;
  role: string;
}
