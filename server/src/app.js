const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'ShopSmart Backend is running',
        timestamp: new Date().toISOString(),
    });
});

// Health check for Docker HEALTHCHECK / ECS
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Root Route (optional, just to show something)
app.get('/', (req, res) => {
    res.send('ShopSmart Backend Service');
});

// Product List Endpoint
app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'Wireless Headphones', price: 99.99, category: 'Electronics' },
        { id: 2, name: 'Running Shoes', price: 59.99, category: 'Sports' },
        { id: 3, name: 'Coffee Maker', price: 49.99, category: 'Home' },
        { id: 4, name: 'Novel', price: 14.99, category: 'Books' },
    ]);
});

module.exports = app;
