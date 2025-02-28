import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod';
import { hash } from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Hash the password
    const hashedPassword = await hash(validatedData.password, 10);

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      console.error('User with this email already exists');
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        passwordHash: hashedPassword,
        role: validatedData.role,
      },
    });

    // Return the created user
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation error:', error.errors);
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors,
      }, { status: 400 });
    }

    console.error('Unexpected error:', error);
    return NextResponse.json({
      error: 'An unexpected error occurred',
    }, { status: 500 });
  }
} 