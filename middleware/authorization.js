const jwt = require("jsonwebtoken");
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            message: "Token requerido",
        });
    }

    try { 
        const openToken = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = openToken.user;
        next();
    } catch (error) {
        res.json({
            message: "Error con el token.",
        });
    }
};

module.exports = verifyToken;