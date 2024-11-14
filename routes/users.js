const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post("/create", userController.createUser);
router.get("/login", userController.loginUser);
router.get("/verify/:id", userController.verifyToken);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;