// Importa mongoose
const mongoose = require('mongoose');

// Define el esquema de usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

// Crea y exporta el modelo basado en el esquema
module.exports = mongoose.model('User', userSchema);