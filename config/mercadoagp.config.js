import MercadoPagoConfig from "mercadopago";
import dotenv from 'dotenv';

dotenv.config();

MercadoPagoConfig.configure({
    access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
})


export default MercadoPagoConfig