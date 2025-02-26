/**
 * File: README.md
 * Created: [Original creation date]
 * Changes: 
 * - Added documentation about file header comments practice to the Contributing section
 * - Added information about the backend implementation
 * - Updated database information to SQLite instead of PostgreSQL
 */

# Lavender Health Records Platform

A digital health records platform tailored for the Nigerian market, designed to securely store and manage patient medical records, lab results, and prescriptions following a Software-as-a-Service (SaaS) business model.

## Features

- **Health Records Management**: Store and access patient histories, lab results, and other medical data
- **Prescription Management**: Create, track, and manage prescriptions
- **Offline Support**: Continue working during internet outages with automatic synchronization
- **Data Security**: End-to-end encryption for sensitive patient information
- **User-Friendly Interface**: Intuitive design for medical practitioners with varying tech skills
- **Mobile Responsive**: Works on both desktop and mobile devices

## Documentation

For detailed project specifications and requirements, please refer to our documentation:

- [Product Requirements Document (PRD)](./docs/PRD.md) - Comprehensive specification of features, requirements, and implementation roadmap

Additional documentation can be found in the [docs](./docs) directory.

## Target Audience

- Middle and upper-class patients in Nigeria
- Private hospitals and medical practitioners in Nigeria

## Technical Features

- **Offline-First Architecture**: IndexedDB for local storage and synchronization
- **Data Encryption**: AES-GCM encryption for sensitive patient data
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Performance Optimized**: Fast loading times even on slower connections

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/fisayorotibi/health-project.git
   cd lavender
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── dashboard/          # Dashboard pages
│   ├── patients/           # Patient management pages
│   ├── medical-records/    # Medical records pages
│   ├── prescriptions/      # Prescription management pages
│   ├── settings/           # Settings pages
│   └── ...
├── components/             # React components
│   ├── ui/                 # UI components
│   ├── layout/             # Layout components
│   ├── dashboard/          # Dashboard-specific components
│   ├── patients/           # Patient-specific components
│   └── ...
├── lib/                    # Utility functions
│   ├── offline-storage.ts  # Offline storage utilities
│   ├── encryption.ts       # Data encryption utilities
│   └── ...
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
└── ...
docs/                       # Project documentation
├── PRD.md                  # Product Requirements Document
└── README.md               # Documentation guide
```

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes with Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **State Management**: React Context API, Custom Hooks
- **Data Storage**: IndexedDB (local), SQLite/PostgreSQL (remote)
- **Authentication**: JWT-based authentication
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Backend Architecture

The application uses a Next.js API Routes backend with the following components:

- **Database**: SQLite (development) / PostgreSQL (production) with Prisma ORM for type-safe database access
- **Authentication**: JWT-based authentication with secure password hashing
- **API Routes**: RESTful API endpoints for all CRUD operations
- **Middleware**: Request authentication and validation
- **Offline Sync**: Seamless synchronization between local and remote data

### API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Authenticate a user

- **Patients**
  - `GET /api/patients` - Get all patients
  - `POST /api/patients` - Create a new patient
  - `GET /api/patients/:id` - Get a specific patient
  - `PUT /api/patients/:id` - Update a patient
  - `DELETE /api/patients/:id` - Delete a patient

- **Medical Records**
  - `GET /api/patients/:id/medical-records` - Get all medical records for a patient
  - `POST /api/patients/:id/medical-records` - Create a new medical record
  - `PUT /api/medical-records/:id` - Update a medical record
  - `DELETE /api/medical-records/:id` - Delete a medical record

- **Prescriptions**
  - `GET /api/patients/:id/prescriptions` - Get all prescriptions for a patient
  - `POST /api/patients/:id/prescriptions` - Create a new prescription
  - `PUT /api/prescriptions/:id` - Update a prescription
  - `DELETE /api/prescriptions/:id` - Delete a prescription

### Data Security

- **End-to-End Encryption**: Sensitive patient data is encrypted on the client before being sent to the server
- **JWT Authentication**: Secure token-based authentication for API access
- **Password Hashing**: Secure password storage using bcrypt
- **HTTPS**: All API requests are made over HTTPS

## Deployment

The application can be deployed to any hosting service that supports Next.js applications, such as Vercel, Netlify, or a traditional server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Code Documentation Standards

All files in this codebase must include a header comment that documents changes made to the file. This applies to both new files and updates to existing files. For detailed guidelines, please refer to [CONTRIBUTING.md](./src/CONTRIBUTING.md).

Example of a file header comment:
```
/**
 * File: example.tsx
 * Created: 2023-06-15
 * Changes: 
 * - 2023-06-15: Initial implementation
 * - 2023-07-20: Added new feature X
 */
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
