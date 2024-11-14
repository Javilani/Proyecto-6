// Importa mongoose
const mongoose = require('mongoose');

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cart: { type: mongoose.Types.ObjectId, ref: "Cart", default: [] },
    receipts: { type: Array, default: [] }
});

// Crea y exporta el modelo basado en el esquema
module.exports = mongoose.model('User', userSchema);