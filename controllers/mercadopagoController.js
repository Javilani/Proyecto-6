// import MercadoPagoConfig from "mercadopago";
const mercadopago = require('../config/mercadopago.config');

const createPreference = async(req, res) => {
    try {
        const { cart, total } = req.body;
        const products = cart.map((product) => ({
            title: product.nombre,
            unit_price: product.precio,
            quantity: product.quantity,
            currency_id: 'CLP'
        }));
        const preferences = {
            products,
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending'
            },
            auto_return: 'approved'
        };
        const response = await mercadopago.preferences.create(preferences);
        res.status(200).json({ id: response.body.id })
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).json({error: error});
    }
}

module.exports = createPreference;