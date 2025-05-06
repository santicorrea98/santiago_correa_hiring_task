import { decrypt } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');

  if (!cookies.session) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  const { token } = await decrypt(cookies.session);

  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const backRes = await fetch(`${process.env.API_URL}/api/house/${id}`, {
      headers: { Authorization: token },
    });

    if (!backRes.ok) {
      const err = await backRes.text();
      return res.status(backRes.status).json({ error: err });
    }

    const data = await backRes.json();
    return res.status(200).json(data);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch information. Try again later.' });
  }
}
