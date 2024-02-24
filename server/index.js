const express = require('express');
const dbPool = require('./db');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/api', async (req, res) => {
    try {
        const { rows } = await dbPool.query('SELECT $1::text as message', ['Hello, world!']);
        res.json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

app.post('/api/addProduct', async (req, res) => {
    try {
        const { product_name, category_id, supplier_id, price, stock_quantity } = req.body;
        console.log(req.body);

        const { rows } = await dbPool.query(
            'INSERT INTO inventory (product_name, category_id, supplier_id, price, stock_quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [product_name, category_id, supplier_id, price, stock_quantity]
        );

        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/seeds', async (req, res) => {
    try {
        const { rows } = await dbPool.query('SELECT * FROM seeds');
        res.json(rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// CREATE TABLE seeds(
//     seed_id SERIAL PRIMARY KEY,
//     serial_number VARCHAR(50) NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     quantity DECIMAL(10, 2),
//     price DECIMAL(10, 2),
//     user_email VARCHAR(255) REFERENCES users(email)
// );

app.post('/api/add/seed', async (req, res) => {
    try {
        const { name, quantity, price, user_email } = req.body;

        const { rows } = await dbPool.query(
            'INSERT INTO seeds (name, quantity, price, user_email) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, quantity, price, user_email]
        );

        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/seed/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await dbPool.query('SELECT * FROM seeds WHERE id = $1', [id]);
        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/add/user', async (req, res) => {
    try {
        const { name, email } = req.body;

        const { rows } = await dbPool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );

        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const { rows } = await dbPool.query('SELECT * FROM users');
        res.json(rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await dbPool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all seeds for a user

app.post('/api/user/seeds', async (req, res) => {
    try {
        const { email } = req.body;
        const { rows } = await dbPool.query('SELECT * FROM seeds WHERE user_email = $1', [email]);
        res.json(rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
