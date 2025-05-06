import { ApiError, House } from '@/types';
import { toCamelCaseObject, toSnakeCaseObject } from '@/utils';

interface AllHousesResponse {
  houses: House[];
}

interface HouseDetailsResponse {
  house: House;
}

type CreateHouseBody = Omit<House, 'id'>;

const baseUrl = '/api/house';

export const getAllHouses = async (): Promise<AllHousesResponse> => {
  const res = await fetch(`${baseUrl}`);

  if (res.status === 401) {
    throw new ApiError('Token unauthorized. Refresh the page and login again.', 401);
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Failed to fetch houses');
  }

  return { houses: toCamelCaseObject(await res.json()) as House[] };
};

export const getHouseDetails = async (id: number): Promise<HouseDetailsResponse> => {
  const res = await fetch(`${baseUrl}/${id}`);

  if (res.status === 401) {
    throw new ApiError('Token unauthorized. Refresh the page and login again.', 401);
  }

  if (res.status === 404) {
    throw new ApiError(`House with ID ${id} not found`, 404);
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Failed to fetch house with ID ${id}`);
  }

  return { house: toCamelCaseObject(await res.json()) as House };
};

export const handleCreateHouse = async (houseData: CreateHouseBody): Promise<string> => {
  const res = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toSnakeCaseObject(houseData)),
  });

  if (res.status === 401) {
    throw new ApiError('Token unauthorized. Refresh the page and login again.', 401);
  }

  if (res.status === 400) {
    throw new ApiError(`Uh oh! Something is wrong with the values entered`, 400);
  }

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Failed to create house');
  }

  return 'House successfully created!';
};
