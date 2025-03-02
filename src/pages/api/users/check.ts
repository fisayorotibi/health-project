import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from 'pg';

// Create a new PostgreSQL client
const client = new Client({
    user: 'postgres', // your database username
    host: 'localhost',
    database: 'lavender',
    password: 'Fisayomi1*', // your database password
    port: 5432,
});

// Connect to the database
client.connect();

// API route to check if a user exists by email
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        try {
            // Check if user exists by email
            const userExistsRes = await client.query('SELECT COUNT(*) FROM users WHERE email = $1', [email]);
            const userExists = parseInt(userExistsRes.rows[0].count) > 0;

            if (userExists) {
                return res.status(409).json({ error: 'User already exists' }); // Conflict status
            }

            res.status(200).json({ userExists: false }); // User does not exist
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Database error:', error.message);
            } else {
                console.error('Unknown error occurred:', error);
            }
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 