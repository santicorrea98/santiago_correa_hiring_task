import { getAllHouses, getHouseDetails, handleCreateHouse } from './api/house';
import { getAllUsers, getUserDetails, handleCreateUser } from './api/user';
import { Action, ActionOption, UserRole } from './types';

export const USER_ROLE = 'user';
export const ADMIN_ROLE = 'admin';

export const ALL_ROLES: UserRole[] = [USER_ROLE, ADMIN_ROLE];
export const MAP_USER_ROLE_OPTION: Record<UserRole, string> = {
  [USER_ROLE]: 'Agent',
  [ADMIN_ROLE]: 'Admin',
};

export const LIST_PROPERTIES = 'listProperties';
export const PROPERTY_DETAILS = 'propertyDetails';
export const CREATE_PROPERTY = 'createProperty';
export const LIST_USERS = 'listUsers';
export const USER_DETAIL = 'userDetail';
export const CREATE_USER = 'createUser';

export const ALL_ACTIONS: ActionOption[] = [
  { key: LIST_PROPERTIES, label: 'List all properties' },
  { key: PROPERTY_DETAILS, label: 'View full property details' },
  { key: CREATE_PROPERTY, label: 'Create new property' },
  { key: LIST_USERS, label: 'List all users', isAdminOnly: true },
  { key: USER_DETAIL, label: 'View a user details', isAdminOnly: true },
  { key: CREATE_USER, label: 'Create new user', isAdminOnly: true },
];
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const ACTION_KEY_TO_CALL: Record<Action, Function> = {
  [LIST_PROPERTIES]: getAllHouses,
  [PROPERTY_DETAILS]: getHouseDetails,
  [CREATE_PROPERTY]: handleCreateHouse,
  [LIST_USERS]: getAllUsers,
  [USER_DETAIL]: getUserDetails,
  [CREATE_USER]: handleCreateUser,
};

export const MAX_ROOMS_FILTER = 3;
