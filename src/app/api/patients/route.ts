/**
 * File: route.ts
 * Created: [Current Date]
 * Changes: Initial creation - API route for patient management
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for patient creation
const patientSchema = z.object({
  identifier: z.string().min(1, 'Patient identifier is required'),
  gender: z.string().optional(),
  encryptedData: z.string().min(1, 'Encrypted patient data is required'),
});

// GET /api/patients - Get all patients
export async function GET(request: NextRequest) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get patients created by this user
    const patients = await prisma.patient.findMany({
      where: {
        createdById: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    );
  }
}

// POST /api/patients - Create a new patient
export async function POST(request: NextRequest) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = patientSchema.parse(body);

    // Check if patient with this identifier already exists
    const existingPatient = await prisma.patient.findUnique({
      where: {
        identifier: validatedData.identifier,
      },
    });

    if (existingPatient) {
      return NextResponse.json(
        { error: 'Patient with this identifier already exists' },
        { status: 400 }
      );
    }

    // Create the patient
    const patient = await prisma.patient.create({
      data: {
        identifier: validatedData.identifier,
        gender: validatedData.gender,
        encryptedData: validatedData.encryptedData,
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating patient:', error);
    return NextResponse.json(
      { error: 'Failed to create patient' },
      { status: 500 }
    );
  }
} 