const express = require('express');
const router = express.Router();

const donationController = require('../controllers/donationController');

router.post("/create", donationController.createDonation);
router.get("/readall", donationController.readAllDonations);
router.get("/readone/:id", donationController.readOneDonation);
router.put("/update/:id", donationController.updateDonation);
router.delete("/delete/:id", donationController.deleteDonation);

module.exports = router;