const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
    credentials: true, // Allow credentials if needed
}));
app.use(bodyParser.json());

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

// API route to check if a user exists and create a new user
app.post('/api/users', async (req, res) => {
    const { uid, email, displayName } = req.body;

    try {
        // Check if user exists
        const userExistsRes = await client.query('SELECT COUNT(*) FROM users WHERE uid = $1', [uid]);
        const userExists = parseInt(userExistsRes.rows[0].count) > 0;

        if (!userExists) {
            // Create a new user
            await client.query('INSERT INTO users (uid, email, display_name) VALUES ($1, $2, $3)', [uid, email, displayName]);
        }

        res.status(200).json({ userExists });
    } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API route to check if a user exists by email
app.post('/api/users/check', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists by email
        const userExistsRes = await client.query('SELECT COUNT(*) FROM users WHERE email = $1', [email]);
        const userExists = parseInt(userExistsRes.rows[0].count) > 0;

        if (userExists) {
            return res.status(409).json({ error: 'User already exists' }); // Conflict status
        }

        res.status(200).json({ userExists: false }); // User does not exist
    } catch (error) {
        console.error('Database error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 