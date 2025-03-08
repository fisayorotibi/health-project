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

interface User {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// User authentication
export async function authenticateUser(email: string, password: string) {
  console.log('Attempting to authenticate user:', email);
  const user = await prisma.$queryRaw<User[]>`SELECT * FROM "User" WHERE LOWER(email) = LOWER(${email})`;

  if (!user || user.length === 0) {
    console.log('User not found:', email);
    return null;
  }

  const isPasswordValid = await compare(password, user[0].passwordHash);
  console.log('Password valid:', isPasswordValid);

  if (!isPasswordValid) {
    console.log('Invalid password for user:', email);
    return null;
  }

  // Don't return the password hash
  const { passwordHash, ...userWithoutPassword } = user[0];
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