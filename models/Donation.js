const mongoose = require('mongoose');

// Define el esquema de la donación
const donationSchema = new mongoose.Schema({
    idProd: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true }, 
    description: { type: String, required: true },
});

// Crea y exporta el modelo basado en el esquema
module.exports = mongoose.model('Donation', donationSchema);