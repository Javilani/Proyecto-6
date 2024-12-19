const { MercadoPagoConfig } = require('mercadopago');
require("dotenv").config();

console.log('Access Token:', process.env.MERCADOPAGO_ACCESS_TOKEN);

const client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    options: { sandbox: true }
})

// Exporta el módulo configurado
module.exports = client;

