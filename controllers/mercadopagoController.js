const { Preference } = require('mercadopago');
const client = require('../config/mercadopago.config');

const createPreference = async(req, res) => {
    try {
        const { cart } = req.body;
        // Vamos a estructuras los datos de los productos del carrito - Debe ser idealmente un Array
        const items = cart.map((product) => ({
            title: product.nombre,
            unit_price: Number(product.precio),
            quantity: Number(product.quantity),
            currency_id: 'CLP'
        }));

        // Es el cuerpo de configuración de las preferencias de compra para MercadoPago
        const body = {
            items, // Debe tener un campo Item que sea un arreglo
            back_urls: {
                success: 'http://localhost:5173/mercadopago/status?status=approved',
                failure: 'http://localhost:5173/mercadopago/status?status=failure',
                pending: 'http://localhost:5173/mercadopago/status?status=pending'
            },
            auto_return: 'approved'
        };
        
        const preference = new Preference(client);
        const response = await preference.create({ body });
        
        res.status(200).json({ id: response.id })
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).json({error: error});
    }
}

module.exports = { createPreference };