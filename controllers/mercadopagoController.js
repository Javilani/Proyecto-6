import MercadoPagoConfig from "mercadopago";

export const createPreference = async(req, res) => {
    try {
        const { cart, total } = req.body;

        const donations = cart.map((donation) => ({
            title: donation.name,
            unit_price: donation.price,
            quantity: donation.quantity,
            currency_id: 'CLP'
        }));

        const preferences = {
            donations,
            back_urls: {
                success: 'http://localhost:3000/success',
                failure: 'http://localhost:3000/failure',
                pending: 'http://localhost:3000/pending'
            },
            auto_return: 'approved'
        };

        const response = await MercadoPagoConfig.preferences.create(preferences);
        res.status(200).json({ id: response.body.id })
    } catch (error) {
        res.status(500).json({error: error});
    }
}