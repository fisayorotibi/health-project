/**
 * File: route.ts
 * Created: [Current Date]
 * Changes: Initial creation - API route for managing a specific patient
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for patient update
const patientUpdateSchema = z.object({
  gender: z.string().optional(),
  encryptedData: z.string().optional(),
});

// GET /api/patients/[id] - Get a specific patient
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const patientId = params.id;

    // Get the patient
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Check if the user has access to this patient
    if (patient.createdById !== userId) {
      return NextResponse.json(
        { error: 'You do not have access to this patient' },
        { status: 403 }
      );
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json(
      { error: 'Failed to fetch patient' },
      { status: 500 }
    );
  }
}

// PUT /api/patients/[id] - Update a specific patient
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const patientId = params.id;

    // Get the patient
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Check if the user has access to this patient
    if (patient.createdById !== userId) {
      return NextResponse.json(
        { error: 'You do not have access to this patient' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = patientUpdateSchema.parse(body);

    // Update the patient
    const updatedPatient = await prisma.patient.update({
      where: {
        id: patientId,
      },
      data: {
        gender: validatedData.gender,
        encryptedData: validatedData.encryptedData,
      },
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating patient:', error);
    return NextResponse.json(
      { error: 'Failed to update patient' },
      { status: 500 }
    );
  }
}

// DELETE /api/patients/[id] - Delete a specific patient
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get user ID from request headers (set by middleware)
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const patientId = params.id;

    // Get the patient
    const patient = await prisma.patient.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      return NextResponse.json(
        { error: 'Patient not found' },
        { status: 404 }
      );
    }

    // Check if the user has access to this patient
    if (patient.createdById !== userId) {
      return NextResponse.json(
        { error: 'You do not have access to this patient' },
        { status: 403 }
      );
    }

    // Delete the patient
    await prisma.patient.delete({
      where: {
        id: patientId,
      },
    });

    return NextResponse.json(
      { message: 'Patient deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting patient:', error);
    return NextResponse.json(
      { error: 'Failed to delete patient' },
      { status: 500 }
    );
  }
} 