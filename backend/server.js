const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db');
const encuestasRoutes = require('./routes/encuestas');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de seguridad y optimización
app.use(helmet());
app.use(compression());

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'https://deploy-vercel-mify2r0ao-rubyssjs-projects.vercel.app', 'https://oukitel-survey-49d8sybdi-rubyssjs-projects.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Conectar a MongoDB
connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 