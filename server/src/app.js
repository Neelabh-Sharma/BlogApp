const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

// Default Route 
app.get('/',(req,res) =>{
    res.send("API Version 1.0.0");
})

// Routes
app.use('/api/auth', authRoutes);

// Error Handler
app.use(errorHandler);

module.exports = app;
