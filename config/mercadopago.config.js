const { MercadoPagoConfig } = require('mercadopago');
require("dotenv").config();

// Configura el SDK globalmente
const mp = new MercadoPagoConfig({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN, 
    });
// mercadopago.configure({
//     access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
// });

// Exporta el módulo configurado
module.exports = mp;

