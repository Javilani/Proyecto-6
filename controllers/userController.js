const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const Cart = require('../models/Cart');
const User = require('../models/User');

// Crear un usuario
const createUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);

        const newCart = await Cart.create({});

        const newUser = await User.create({
            name,
            lastname,
            email,
            password: hashedPassword,
            cart: newCart,
        });

        const payload = {
            user: {
                id: newUser._id,
            },
        };

        jwt.sign(payload, process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (error, token) => {
                if (error) throw error;

                res.json({
                    message: "Usuario creado con éxito.",
                    data: token,
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error con la creación de usuario. Intenta nuevamente con otro nombre y/o email.",
            error: error,
        });
    }
};

// Abrir sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(400).json({
                message: "El usuario o la contraseña son incorrectas",
            });
        }

        const verifiedPass = await bcryptjs.compare(password, foundUser.password);

        if (!verifiedPass) {
            return await res.status(400).json({
                message: "El usuario o la contraseña no coinciden",
            });
        }

        const payload = {
            user: {
                id: foundUser.id,
            },
        };

        jwt.sign(
            payload, process.env.JWT_SECRET, 
            { expiresIn: "1h" },
            (error, token) => {
                if (error) throw error;

                res.json({
                    message: "Inicio de sesión exitoss",
                    data: token,
                });
            }
        );

        return;
    } catch (error) {
        res.status(500).json({
            message: "Hubo un problema con la autenticación",
            data: error,
        });
    }
};

// Recuperación de datos de un usuario por ID
const verifyToken = async (req, res) => {
    try {
        const foundUser = await User.findById(req.user.id).select("-password");

        return res.json({
            message: "Datos de usuario encontrados.",
            data: foundUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "El usuario no se encuentra identificado",
        });
    }
};

// Actualizar datos de un usuario por ID
const updateUser = async (req, res) => {
    const updatedData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            updatedData,
            { new: true }
        ).select("-password");

        res.json({
            message: "Usuario actualizado con éxito",
            data: updatedUser,
        })
    } catch (error) {
        res.status(500).json({
            message: "Hubo un error actualizando el usuario",
        });
    }
};

// Eliminar usuario por ID
const deleteUser = async (req, res) => {
    try {
        const delUser = await User.findByIdAndDelete(req.user.id);
        if (!delUser) {
            return res.status(404).json({
                message: "Usuario no encontrado."
            });
        }
        res.status(200).json({
            message: "Usuario eliminado con éxito.",
            data: delUser,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = { createUser, loginUser, verifyToken, updateUser, deleteUser }