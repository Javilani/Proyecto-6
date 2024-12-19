const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const rutaGatos = require('./routes/cats');
const rutaDonaciones = require('./routes/donations');
const rutaUsuarios = require('./routes/users');
const rutaMercadoPago = require('./routes/mercadoPagoRoute');

const connectDB = require('./config/db');

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

// Configuración de Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de ejemplo',
            version: '1.0.0',
            description: 'Documentación interactiva de la API',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// Ruta para servir la documentación interactiva
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuración de CORS
app.use(cors());

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Rutas de la aplicación
app.use('/cats', rutaGatos);
app.use('/donations', rutaDonaciones);
app.use('/users', rutaUsuarios);
app.use('/', rutaMercadoPago);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});