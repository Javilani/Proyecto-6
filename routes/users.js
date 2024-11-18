const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authorization');

router.post("/create", userController.createUser);
router.get("/login", userController.loginUser);
router.get("/verify", authMiddleware, userController.verifyToken);
router.put("/update", authMiddleware, userController.updateUser);
router.delete("/delete", authMiddleware, userController.deleteUser);

module.exports = router;