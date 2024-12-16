const express = require('express');
const router = express.Router();
// import { createPreference } from "../controllers/mercadopagoController";
const createPreference = require('../controllers/mercadopagoController');

router.post('/create-preference', createPreference);

module.exports = router;