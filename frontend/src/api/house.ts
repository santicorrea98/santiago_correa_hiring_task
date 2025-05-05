import { House } from '@/types';

interface AllHousesResponse {
  houses: House[];
}

interface HouseDetailsResponse {
  house: House;
}

type CreateHouseBody = Omit<House, 'id'>;

const baseUrl = '/api/house';

export const getAllHouses = async (): Promise<AllHousesResponse> => {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${baseUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Failed to fetch houses');
  }

  return { houses: (await res.json()) as House[] };
};

export const getHouseDetails = async (id: number): Promise<HouseDetailsResponse> => {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Failed to fetch house with ID ${id}`);
  }

  return { house: (await res.json()) as House };
};

export const handleCreateHouse = async (houseData: CreateHouseBody): Promise<string> => {
  const token = localStorage.getItem('authToken');
  const res = await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(houseData),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || 'Failed to create house');
  }

  return 'House successfully created!';
};
