const express = require('express');
const router = express.Router();

const ejemploRuta = router.get('/', (req, res) => {
    res.send('Hola Mundo');
});

module.exports = { ejemploRuta }