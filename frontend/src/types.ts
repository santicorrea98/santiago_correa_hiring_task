export const userRoles = ['user', 'admin'] as const;
export type UserRole = (typeof userRoles)[number];
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
