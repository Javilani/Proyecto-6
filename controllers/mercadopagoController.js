// import MercadoPagoConfig from "mercadopago";
const mp = require('../config/mercadopago.config');

const createPreference = async(req, res) => {
    try {
        const { cart, total } = req.body;

        const items = cart.map((donation) => ({
            title: donation.name,
            unit_price: parseFloat(donation.price),
            quantity: parseInt(donation.quantity),
            currency_id: 'CLP',
        }));

        const preferences = {
            items,
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending'
            },
            auto_return: 'approved'
        };

        const response = await mp.preferences.create(preferences);
        res.status(200).json({ id: response.body.id })
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        res.status(500).json({error: error});
    }
}

module.exports = createPreference;