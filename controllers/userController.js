const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');

// Crear un usuario

const createUser = async (req, res) => {
    const { name, lastname, email, password } = req.body;
    try {
        // Encriptar contraseña
        const hashedPassword = await bcryptjs.hash(password, 10);
        
        // Crear usuario
        const newUser = await User.create({
            name,
            lastname,
            email,
            password: hashedPassword,
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
                    token: token,
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error con la creación de usuario. Intenta nuevamente con otro email.",
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
                    message: "Inicio de sesión exitoso",
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


// ARREGLAR VERIFYTOKEN, LA DESCRIPCIÓN DE LO QUE HACE


// Mantiene la sesión del usuario abierta
const verifyToken = async (req, res) => {
    try {
        const foundUser = await User.findById(req.user.id).select("-password");
        
        if (!foundUser) {
            return res.status(404).json({ 
                message: "Usuario no encontrado" 
            });
        }

        const newToken = jwt.sign(
            { id: foundUser.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Sesión válida. Token renovado.",
            data: foundUser,
            token: newToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al verificar el token.",
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