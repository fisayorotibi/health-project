/**
 * File: route.ts
 * Created: [Current Date]
 * Changes: Initial creation - API route for user login
 */

import { NextRequest, NextResponse } from 'next/server';
import { loginSchema, authenticateUser, generateToken } from '@/lib/auth';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = loginSchema.parse(body);
    
    // Authenticate the user
    const user = await authenticateUser(
      validatedData.email,
      validatedData.password
    );
    
    if (!user) {
      return NextResponse.json({
        error: 'Invalid email or password',
      }, { status: 401 });
    }
    
    // Generate a token
    const token = generateToken(user.id);
    
    // Return the user and token
    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors,
      }, { status: 400 });
    }
    
    return NextResponse.json({
      error: 'An unexpected error occurred',
    }, { status: 500 });
  }
} 