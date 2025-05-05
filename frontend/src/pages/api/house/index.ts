import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  try {
    if (req.method === 'GET') {
      const backRes = await fetch(`${process.env.API_URL}/api/houses`, {
        headers: { Authorization: token },
      });

      if (!backRes.ok) {
        return res.status(backRes.status).json({ error: 'Failed to fetch houses' });
      }

      const data = await backRes.json();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const backRes = await fetch(`${process.env.API_URL}/api/house`, {
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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch information. Try again later.' });
  }
}
