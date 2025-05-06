import { ADMIN_ROLE } from '@/constants';
import { decrypt } from '@/utils';
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');

  if (!cookies.session) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  const { token, role } = await decrypt(cookies.session);

  if (role !== ADMIN_ROLE) {
    return res.status(401).json({ error: 'Action only allowed for admins' });
  }

  try {
    if (req.method === 'GET') {
      const backRes = await fetch(`${process.env.API_URL}/api/users`, {
        headers: { Authorization: token },
      });

      if (!backRes.ok) {
        return res.status(backRes.status).json({ error: 'Failed to fetch users' });
      }

      const data = await backRes.json();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const backRes = await fetch(`${process.env.API_URL}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify(req.body),
      });

      if (!backRes.ok) {
        const err = await backRes.text();
        return res.status(backRes.status).json({ error: err });
      }

      const data = await backRes.json();
      return res.status(201).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch {
    return res.status(500).json({ error: 'Failed to fetch information. Try again later.' });
  }
}
