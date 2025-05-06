import { decrypt } from '@/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parse(req.headers.cookie || '');
  const session = cookies.session;

  if (!session) {
    return res.status(200).json({ session: undefined });
  }

  const { token, role } = await decrypt(session);
  return res.status(200).json({ token, role });
}
