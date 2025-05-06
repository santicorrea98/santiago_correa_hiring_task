import { encrypt } from '@/utils';
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { role } = JSON.parse(req.body);

  if (typeof role !== 'string') {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    const backRes = await fetch(`${process.env.API_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });

    if (!backRes.ok) {
      const error = await backRes.json();
      return res.status(backRes.status).json(error);
    }

    const { token } = await backRes.json();
    const session = await encrypt({ token, role });

    res.setHeader(
      'Set-Cookie',
      serialize('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 300,
      })
    );

    return res.status(200).json('Logged in!');
  } catch {
    return res.status(500).json({ message: 'Failed to fetch information. Try again later.' });
  }
}
