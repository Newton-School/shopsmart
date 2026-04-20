const path = require('path');

// Load server/.env so DATABASE_URL and JWT_SECRET match the running stack
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
