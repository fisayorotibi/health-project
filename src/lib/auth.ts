/**
 * File: auth.ts
 * Created: [Current Date]
 * Changes: Initial creation - Authentication utilities for the application
 */

import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from './prisma';

// Validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'DOCTOR', 'NURSE', 'RECEPTIONIST']).default('DOCTOR'),
});

// User authentication
export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = await compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return null;
  }

  // Don't return the password hash
  const { passwordHash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// User registration
export async function registerUser(name: string, email: string, password: string, role: string) {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: role as any,
    },
  });

  // Don't return the password hash
  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Generate JWT token
export function generateToken(userId: string) {
  const token = sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
  return token;
}

// Verify JWT token
export function verifyToken(token: string) {
  try {
    const decoded = verify(token, process.env.JWT_SECRET!);
    return decoded as { userId: string };
  } catch (error) {
    return null;
  }
} 