const { MercadoPagoConfig } = require('mercadopago');
require("dotenv").config();

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN })

// Exporta el módulo configurado
module.exports = client;

