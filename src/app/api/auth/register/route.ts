/**
 * File: route.ts
 * Created: [Current Date]
 * Changes: Initial creation - API route for user registration
 */

import { NextRequest, NextResponse } from 'next/server';
import { registerSchema, registerUser, generateToken } from '@/lib/auth';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = registerSchema.parse(body);
    
    // Register the user
    const user = await registerUser(
      validatedData.name,
      validatedData.email,
      validatedData.password,
      validatedData.role
    );
    
    // Generate a token
    const token = generateToken(user.id);
    
    // Return the user and token
    return NextResponse.json({
      user,
      token,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        error: 'Validation error',
        details: error.errors,
      }, { status: 400 });
    }
    
    if (error instanceof Error) {
      return NextResponse.json({
        error: error.message,
      }, { status: 400 });
    }
    
    return NextResponse.json({
      error: 'An unexpected error occurred',
    }, { status: 500 });
  }
} 