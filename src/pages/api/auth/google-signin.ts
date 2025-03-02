import { NextApiRequest, NextApiResponse } from 'next';
import { checkIfUserExists } from '@/lib/db'; // Import your existing function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, email, displayName } = req.body;

    // Check if the user exists
    const userExists = await checkIfUserExists(uid);
    if (userExists) {
      return res.status(200).json({ message: 'User exists', userExists: true });
    } else {
      return res.status(404).json({ message: 'User does not exist', userExists: false });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 