const express = require('express');
const router = express.Router();
const Encuesta = require('../models/Encuesta');

// Crear una nueva encuesta
router.post('/', async (req, res) => {
  try {
    const encuesta = new Encuesta(req.body);
    const encuestaGuardada = await encuesta.save();
    res.status(201).json(encuestaGuardada);
  } catch (error) {
    console.error('Error al guardar encuesta:', error);
    res.status(500).json({ message: 'Error al guardar la encuesta', error: error.message });
  }
});

// Obtener todas las encuestas
router.get('/', async (req, res) => {
  try {
    const encuestas = await Encuesta.find();
    res.json(encuestas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las encuestas', error: error.message });
  }
});

module.exports = router; 