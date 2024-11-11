const express = require('express');
const app = express();
const dotenv = require('dotenv');
const rutaejemplo = require('./routes/users');
const connectDB = require('./config/db');

dotenv.config();
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/db');

connectDB();

app.use(express.json());

app.use('/', rutaejemplo);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});