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
- **State Management**: React Context API
- **Data Storage**: IndexedDB (local), RESTful API (remote)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Deployment

The application can be deployed to any hosting service that supports Next.js applications, such as Vercel, Netlify, or a traditional server.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
