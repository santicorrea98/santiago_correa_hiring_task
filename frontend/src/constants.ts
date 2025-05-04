import { ActionOption, UserRole } from './types';

export const MAP_USER_ROLE_OPTION: Record<UserRole, string> = { user: 'Agent', admin: 'Admin' };

export const ALL_ACTIONS: ActionOption[] = [
  { key: 'listProperties', label: 'List all properties' },
  { key: 'propertyDetails', label: 'View full property details' },
  { key: 'createProperty', label: 'Create new property' },
  { key: 'listUsers', label: 'List all users', isAdminOnly: true },
  { key: 'userDetail', label: 'View a user details', isAdminOnly: true },
  { key: 'createUser', label: 'Create new user', isAdminOnly: true },
];
