import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';

// Simulated database for storing reset tokens
const resetTokens = new Map(); // This should be replaced with a proper database in production

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { newPassword, token } = req.body;

    // Verify the token
    const tokenData = resetTokens.get(token);
    if (!tokenData || tokenData.expirationTime < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Here you would typically update the user's password in the database
    console.log('New password (hashed):', hashedPassword);

    // Remove the token after use
    resetTokens.delete(token);

    return res.status(200).json({ message: 'Password updated successfully' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 