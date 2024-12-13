const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authorization');

/**
 * @swagger
 * /users/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario en la base de datos.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos del usuario a crear.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Juan"
 *             lastname:
 *               type: string
 *               example: "Pérez"
 *             password:
 *               type: string
 *               example: "password123"
 *             email:
 *               type: string
 *               example: "juan.perez@example.com"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Usuario creado con éxito."
 *             user:
 *               type: object
 *       500:
 *         description: Error en el servidor.
 *         data: error.message
 */
router.post("/create", userController.createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Iniciar sesión
 *     description: Autentica a un usuario mediante su correo y contraseña.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: email
 *         description: Correo electrónico del usuario.
 *         required: true
 *         type: string
 *       - in: query
 *         name: password
 *         description: Contraseña del usuario.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Usuario autenticado con éxito."
 *             token:
 *               type: string
 *               example: "eyJhbGciOiJIUzI1..."
 *       500:
 *         description: Error en el servidor.
 */
router.post("/login", userController.loginUser);

/**
 * @swagger
 * /users/verify:
 *   get:
 *     tags:
 *       - Users
 *     summary: Verificar y renovar el token del usuario.
 *     description: Verifica si el token del usuario es válido y devuelve un nuevo token junto con los datos del usuario, excepto la contraseña.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sesión válida. Se proporciona un nuevo token y los datos del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión válida. Token renovado.
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 63f76b2e3c4ad21d0c123456
 *                     name:
 *                       type: string
 *                       example: John
 *                     lastname:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor al verificar el token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al verificar el token.
 */
router.get("/verify", authMiddleware, userController.verifyToken);

/**
 * @swagger
 * /users/update:
 *   put:
 *     tags:
 *       - Users
 *     summary: Actualizar datos del usuario
 *     description: Permite actualizar la información de un usuario autenticado.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Datos a actualizar.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Juan"
 *             lastname:
 *               type: string
 *               example: "Pérez"
 *             password:
 *               type: string
 *               example: "newpassword123"
 *             email:
 *               type: string
 *               example: "juan.perez@example.com"
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *       500:
 *         description: Error en el servidor.
 */
router.put("/update", authMiddleware, userController.updateUser);

/**
 * @swagger
 * /users/delete:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Eliminar usuario
 *     description: Elimina al usuario autenticado.
 *     produces:
 *       - application/json
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Usuario eliminado con éxito."
 *       500:
 *         description: Error en el servidor.
 */
router.delete("/delete", authMiddleware, userController.deleteUser);

module.exports = router;