const mongoose = require('mongoose');

// Define el esquema del gato
const catSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true }, // String porque a veces no se sabe que edad tiene / No se sabe
    img: { type: Array, required: true },  // Por qué array????
    description: { type: String, required: true },
});

// Crea y exporta el modelo basado en el esquema
module.exports = mongoose.model('Cat', catSchema);