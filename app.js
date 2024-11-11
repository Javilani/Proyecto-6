const express = require('express');
const app = express();
const dotenv = require('dotenv');
const rutaejemplo = require('./routes/routes');

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', rutaejemplo);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});