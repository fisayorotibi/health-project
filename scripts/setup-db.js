/**
 * File: setup-db.js
 * Created: [Current Date]
 * Changes: Initial creation - Script to set up the database with initial data
 */

const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Setting up database...');

  // Create admin user
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lavender.health' },
    update: {},
    create: {
      email: 'admin@lavender.health',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log(`Created admin user: ${admin.email}`);

  // Create doctor user
  const doctorPassword = await hash('doctor123', 10);
  const doctor = await prisma.user.upsert({
    where: { email: 'doctor@lavender.health' },
    update: {},
    create: {
      email: 'doctor@lavender.health',
      name: 'Dr. John Doe',
      passwordHash: doctorPassword,
      role: 'DOCTOR',
    },
  });
  console.log(`Created doctor user: ${doctor.email}`);

  // Create nurse user
  const nursePassword = await hash('nurse123', 10);
  const nurse = await prisma.user.upsert({
    where: { email: 'nurse@lavender.health' },
    update: {},
    create: {
      email: 'nurse@lavender.health',
      name: 'Nurse Jane Smith',
      passwordHash: nursePassword,
      role: 'NURSE',
    },
  });
  console.log(`Created nurse user: ${nurse.email}`);

  // Create sample patient
  const patient = await prisma.patient.upsert({
    where: { identifier: 'P12345' },
    update: {},
    create: {
      identifier: 'P12345',
      gender: 'Male',
      encryptedData: JSON.stringify({
        firstName: 'Sample',
        lastName: 'Patient',
        dateOfBirth: '1990-01-01',
        phoneNumber: '+2341234567890',
        email: 'patient@example.com',
        address: 'Lagos, Nigeria',
        bloodType: 'O+',
        allergies: ['Penicillin'],
      }),
      createdBy: {
        connect: {
          id: doctor.id,
        },
      },
    },
  });
  console.log(`Created sample patient: ${patient.identifier}`);

  console.log('Database setup complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 