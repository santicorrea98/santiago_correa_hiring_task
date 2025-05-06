import { ENCODED_KEY } from '@/constants';
import { jwtVerify, SignJWT } from 'jose';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toCamelCaseObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCaseObject);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        acc[camelKey] = toCamelCaseObject(obj[key]);
        return acc;
      },
      {} as Record<string, unknown>
    );
  }
  return obj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toSnakeCaseObject = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCaseObject);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce(
      (acc, key) => {
        const snakeKey = key.replace(/([A-Z])/g, (_, letter) => `_${letter.toLowerCase()}`);
        acc[snakeKey] = toSnakeCaseObject(obj[key]);
        return acc;
      },
      {} as Record<string, unknown>
    );
  }
  return obj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('300 sec from now')
    .sign(ENCODED_KEY);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, ENCODED_KEY, {
    algorithms: ['HS256'],
  });
  return payload;
}
