import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Simulated database for storing reset tokens
const resetTokens = new Map();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received request:', req.method, req.body); // Log the incoming request

  if (req.method === 'POST') {
    const { email } = req.body;

    // Generate a secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expirationTime = Date.now() + 3600000; // 1 hour expiration

    // Store the token with the email and expiration time
    resetTokens.set(resetToken, { email, expirationTime });

    const resetUrl = `http://localhost:3000/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Reset email sent' });
    } catch (error) {
      console.error('Error sending email:', error); // Log the error
      return res.status(500).json({ error: 'Failed to send email' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
} 