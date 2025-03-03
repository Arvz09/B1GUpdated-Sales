const express = require("express");
const path = require("path");
const connectDB = require("./config/config");

const app = express();
const PORT = process.env.PORT || 5000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from multiple directories
app.use(express.static(path.join(__dirname, '../frontend'))); // Original static folder
app.use(express.static(path.join(__dirname, 'public'))); // New static folder for EJS templates

// Original routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/Pages/Login/Login.html'));
});

// Handle the missing AgentOrder.html route
app.get('/Pages/Order/AgentOrder.ejs', (req, res) => {
  // Redirect to the EJS order form
  res.redirect('/order');
});

// New EJS template routes
app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/order', (req, res) => {
  res.render('orderForm');
});

// Start Database & Server
connectDB(app, PORT);