import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const backRes = await fetch(`${process.env.API_URL}/api/user/${id}`, {
      headers: { Authorization: token },
    });

    if (!backRes.ok) {
      const err = await backRes.text();
      return res.status(backRes.status).json({ error: err });
    }

    const data = await backRes.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch information. Try again later.' });
  }
}
