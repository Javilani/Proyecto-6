const express = require('express');
const router = express.Router();

const catController = require('../controllers/catController');

router.post("/create", catController.createCat);
router.get("/readall", catController.readAll);
router.get("/readone/:id", catController.readOne);
router.put("/update/:id", catController.updateCat);
router.delete("/delete/:id", catController.deleteCat);

module.exports = router;