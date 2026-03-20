const express = require('express');
const { checkout, listOrders, getOrder } = require('../controllers/orderController');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

router.post('/checkout', checkout);
router.get('/', listOrders);
router.get('/:id', getOrder);

module.exports = router;
