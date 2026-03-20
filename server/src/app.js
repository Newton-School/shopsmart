const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock Products Data
const products = [
  { id: 1, name: "Premium Hoodie", price: 49.99, category: "Apparel" },
  { id: 2, name: "Classic Sneakers", price: 79.99, category: "Footwear" },
  { id: 3, name: "Smart Watch", price: 199.99, category: "Electronics" },
];

// Health Check Route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "ShopSmart Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// Products Route
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Single Product Route
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// Root Route (optional, just to show something)
app.get("/", (req, res) => {
  res.send("ShopSmart Backend Service");
});

module.exports = app;
