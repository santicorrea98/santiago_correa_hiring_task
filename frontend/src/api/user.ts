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
  const res = await fetch(`${baseUrl}`);

  if (res.status === 401) {
    const { error } = await res.json();
    throw new ApiError(error, 401);
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Failed to fetch users');
  }

  return { users: toCamelCaseObject(await res.json()) as User[] };
};

export const getUserDetails = async (id: number): Promise<UserDetailsResponse> => {
  const res = await fetch(`${baseUrl}/${id}`);

  if (res.status === 401) {
    const { error } = await res.json();
    throw new ApiError(error, 401);
  }

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
  const res = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toSnakeCaseObject(userData)),
  });

  if (res.status === 401) {
    const { error } = await res.json();
    throw new ApiError(error, 401);
  }

  if (res.status === 400) {
    throw new ApiError(`Uh oh! Something is wrong with the values entered`, 400);
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Failed to create user');
  }

  return 'User successfully created!';
};
