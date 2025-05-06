import { ADMIN_ROLE } from '@/constants';
import { ApiError, User } from '@/types';
import { toCamelCaseObject, toSnakeCaseObject } from '@/utils';

interface AllUsersResponse {
  users: User[];
}

interface UserDetailsResponse {
  user: User;
}

type CreateUserBody = Omit<User, 'id'>;

const baseUrl = '/api/user';

export const getAllUsers = async (): Promise<AllUsersResponse> => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if (role !== ADMIN_ROLE) {
    throw new Error('Role not allowed for this operation');
  }

  const res = await fetch(`${baseUrl}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Failed to fetch users');
  }

  return { users: toCamelCaseObject(await res.json()) as User[] };
};

export const getUserDetails = async (id: number): Promise<UserDetailsResponse> => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if (role !== ADMIN_ROLE) {
    throw new Error('Role not allowed for this operation');
  }
  const res = await fetch(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (res.status === 404) {
    throw new ApiError(`User with ID ${id} not found`, 404);
  }

  if (res.status === 403) {
    throw new ApiError(`Can't perform this action`, 403);
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Failed to fetch user with ID ${id}`);
  }

  return { user: toCamelCaseObject(await res.json()) as User };
};

export const handleCreateUser = async (userData: CreateUserBody): Promise<string> => {
  const token = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');

  if (role !== ADMIN_ROLE) {
    throw new Error('Role not allowed for this operation');
  }

  const res = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    body: JSON.stringify(toSnakeCaseObject(userData)),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Failed to create user');
  }

  return 'User successfully created!';
};
