const mongoose = require('mongoose');

// Define el esquema del carro
const cartSchema = mongoose.Schema({
    products: [
        {
            quantity: { type: Number, required: true },
            priceID: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
        },
    ],
});

module.exports = cartSchema;