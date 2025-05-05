import {
  ADMIN_ROLE,
  CREATE_PROPERTY,
  CREATE_USER,
  LIST_PROPERTIES,
  LIST_USERS,
  PROPERTY_DETAILS,
  USER_DETAIL,
  USER_ROLE,
} from './constants';

export type UserRole = typeof USER_ROLE | typeof ADMIN_ROLE;

export type Action =
  | typeof LIST_PROPERTIES
  | typeof PROPERTY_DETAILS
  | typeof CREATE_PROPERTY
  | typeof LIST_USERS
  | typeof USER_DETAIL
  | typeof CREATE_USER;
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
