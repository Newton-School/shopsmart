const express = require('express');

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Shopsmart API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
