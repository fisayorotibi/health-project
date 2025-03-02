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

// Function to check if a user exists in the database
export const checkIfUserExists = async (uid: string): Promise<boolean> => {
    const res = await client.query('SELECT COUNT(*) FROM users WHERE uid = $1', [uid]);
    return parseInt(res.rows[0].count) > 0;
};

// Function to create a new user in the database
export const createUserInDatabase = async (user: any): Promise<void> => {
    const { uid, email, displayName } = user;
    await client.query('INSERT INTO users (id, email, display_name) VALUES ($1, $2, $3)', [uid, email, displayName]);
}; 