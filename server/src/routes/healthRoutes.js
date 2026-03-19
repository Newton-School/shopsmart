const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'ShopSmart Backend is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
