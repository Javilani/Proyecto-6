const mongoose = require('mongoose');

// Define el esquema del gato
const catSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },
});

// Crea y exporta el modelo basado en el esquema
module.exports = mongoose.model('Cat', catSchema);