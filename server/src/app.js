const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('ShopSmart Backend Service');
});

// ❌ Catch unhandled routes (important)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ❌ Global error handler (non-zero exit on fatal error)
app.use((err, req, res, next) => {
  console.error('Fatal error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
  process.exit(1); // 🔥 non-zero exit code
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 ShopSmart backend running on port ${PORT}`);
});

module.exports = app;
