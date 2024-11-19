const express = require('express');
const router = express.Router();

const donationController = require('../controllers/donationController');

/**
 * @swagger
 * /donations/create:
 *   post:
 *     tags:
 *       - Donations
 *     summary: Crear una donación
 *     description: Crea una opción nueva de donación con el nombre y monto proporcionados.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la donación.
 *                 example: "Donación mínima"
 *               price:
 *                 type: number
 *                 description: Monto de la donación.
 *                 example: 1000
 *     responses:
 *       200:
 *         description: Donación creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *                   example: "Donación creada con éxito"
 *                 newDonation:
 *                   $ref: '#/components/schemas/Donation'
 *       400:
 *         description: Error al crear la donación, datos inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Precio es obligatorio"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "Error al guardar la donación."
 */
router.post("/create", donationController.createDonation);

/**
 * @swagger
 * /donations/readall:
 *   get:
 *     tags:
 *       - Donations
 *     summary: Obtiene todas las donaciones disponibles.
 *     description: Devuelve una lista con todas las donaciones existentes en el sistema.
 *     responses:
 *       200:
 *         description: Lista de donaciones encontrada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: El ID único de la donación.
 *                   name:
 *                     type: string
 *                     description: El nombre de la donación.
 *                   price:
 *                     type: number
 *                     description: El precio de la donación.
 *       404:
 *         description: No se encontraron donaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No hay donaciones disponibles
 *       500:
 *         description: Error interno del servidor al obtener las donaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener las donaciones
 */
router.get("/readall", donationController.readAllDonations);

/**
 * @swagger
 * /donations/readone/{id}:
 *   get:
 *     tags:
 *       - Donations
 *     summary: Obtiene una donación por su ID.
 *     description: Devuelve los detalles de una donación específica, identificada por su ID único.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID único de la donación a obtener.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Donación encontrada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: El ID único de la donación.
 *                 name:
 *                   type: string
 *                   description: El nombre de la donación.
 *                 price:
 *                   type: number
 *                   description: El precio de la donación.
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ID inválido
 *       404:
 *         description: No se encontró la donación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Donación no encontrada
 *       500:
 *         description: Error interno del servidor al obtener la donación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al obtener la donación
 */
router.get("/readone/:id", donationController.readOneDonation);

/**
 * @swagger
 * /donations/update/{id}:
 *   put:
 *     tags:
 *       - Donations
 *     summary: Actualiza una donación existente.
 *     description: Permite actualizar el nombre y precio de una donación existente por su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID único de la donación a actualizar.
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: Objeto con los nuevos datos de la donación.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nuevo nombre de la donación.
 *                   example: "Donación básica"
 *                 price:
 *                   type: number
 *                   description: Nuevo precio de la donación.
 *                   example: 5000
 *     responses:
 *       200:
 *         description: Donación actualizada con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Donación actualizada con éxito"
 *                 donation:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID único de la donación.
 *                       example: "60b8d8e1b4a1c2a7e9b29b9c"
 *                     name:
 *                       type: string
 *                       description: Nombre de la donación.
 *                       example: "Donación premium"
 *                     price:
 *                       type: number
 *                       description: Precio de la donación.
 *                       example: 10000
 *       400:
 *         description: Datos inválidos en la solicitud.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Datos inválidos"
 *       404:
 *         description: Donación no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Donación no encontrada"
 *       500:
 *         description: Error interno del servidor al intentar actualizar la donación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hubo un error en la búsqueda"
 */
router.put("/update/:id", donationController.updateDonation);

/**
 * @swagger
 * /donations/delete/{id}:
 *   delete:
 *     tags:
 *       - Donations
 *     summary: Eliminar una donación
 *     description: Elimina una donación existente según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la donación que se desea eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Donación eliminada exitosamente.
 *       404:
 *         description: Donación no encontrada.
 *       500:
 *         description: Error al eliminar la donación.
 */
router.delete("/delete/:id", donationController.deleteDonation);


module.exports = router;