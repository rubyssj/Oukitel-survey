const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const encuestasRoutes = require('../routes/encuestas');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://oukitel-survey-49d8sybdi-rubyssjs-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Rutas
app.use('/api/encuestas', encuestasRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Algo salió mal!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
  });
});

module.exports = app; 