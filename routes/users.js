const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authorization');

/**
 * @swagger
 * /users/create:
 *   post:
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
 */
router.post("/create", userController.createUser);

/**
 * @swagger
 * /users/login:
 *   get:
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
router.get("/login", userController.loginUser);

/**
 * @swagger
 * /users/verify:
 *   get:
 *     summary: Verificar token de autenticación y recuperar datos del usuario
 *     description: Verifica si el token proporcionado es válido y devuelve los datos del usuario autenticado.
 *     produces:
 *       - application/json
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Token válido. Datos del usuario recuperados.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "Datos de usuario encontrados."
 *             data:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "Juan"
 *                 lastname:
 *                   type: string
 *                   example: "Pérez"
 *                 email:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *       500:
 *         description: Error en el servidor. Usuario no identificado.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: "El usuario no se encuentra identificado."
 */
router.get("/verify", authMiddleware, userController.verifyToken);

/**
 * @swagger
 * /users/update:
 *   put:
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