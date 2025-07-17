const mongoose = require('mongoose');

const encuestaSchema = new mongoose.Schema({
  usuario: {
    nombre: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    }
  },
  encuestador: {
    nombre: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: false
    }
  },
  votos: {
    type: Map,
    of: {
      like: Number,
      dislike: Number,
      design_like: Number,
      design_dislike: Number,
      buy_yes: Number,
      buy_no: Number
    }
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  productos: [{
    id: String,
    nombre: String
  }]
}, {
  collection: 'Encuesta',
  strict: true,
  versionKey: false
});

// Middleware pre-save para logging
encuestaSchema.pre('save', function(next) {
  console.log('Guardando encuesta:', this);
  next();
});

const EncuestaModel = mongoose.model('Encuesta', encuestaSchema);

module.exports = EncuestaModel; 