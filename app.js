const express = require('express');
const app = express();
const dotenv = require('dotenv');

const rutaGatos = require('./routes/cats');
const rutaDonaciones = require('./routes/donations');
const rutaUsuarios = require('./routes/users');

const connectDB = require('./config/db');

dotenv.config();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/cats', rutaGatos);
app.use('/donations', rutaDonaciones);
app.use('/users', rutaUsuarios);




app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});