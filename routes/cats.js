const express = require('express');
const router = express.Router();

const catController = require('../controllers/catController');

/**
 * @swagger
 * /cats/create:
 *   post:
 *     tags:
 *       - Cats
 *     summary: Crear un nuevo gato
 *     description: Crea un nuevo registro de un gato con los detalles proporcionados en el cuerpo de la solicitud.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del gato.
 *                 example: Michito
 *               age:
 *                 type: string
 *                 description: Edad del gato (en años o meses).
 *                 example: 4
 *               gender:
 *                 type: string
 *                 description: Género del gato.
 *                 example: male
 *               img:
 *                 type: string                
 *                 example: ./img/michito.jpg
 *                 description: URL de la imagen del gato.
 *               description:
 *                 type: string
 *                 description: Descripción del gato.
 *                 example: Muy meloso y cariñoso
 *     responses:
 *       201:
 *         description: Gato agregado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del gato creado.
 *                 name:
 *                   type: string
 *                   description: Nombre del gato.
 *                 age:
 *                   type: string
 *                   description: Edad del gato.
 *                 gender:
 *                   type: string
 *                   description: Género del gato.
 *                 img:
 *                   type: string
 *                   description: Imagen del gato.
 *                 description:
 *                   type: string
 *                   description: Descripción del gato.
 *       400:
 *         description: Error al crear el gato.
 */
router.post("/create", catController.createCat);

/**
 * @swagger
 * /cats/readall:
 *   get:
 *     tags:
 *       - Cats
 *     summary: Obtener todos los gatos
 *     description: Devuelve una lista con todos los gatos almacenados en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de gatos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID único del gato.
 *                   name:
 *                     type: string
 *                     description: Nombre del gato.
 *                   age:
 *                     type: string
 *                     description: Edad del gato.
 *                   gender:
 *                     type: string
 *                     description: Género del gato.
 *                   img:
 *                     type: string
 *                     description: Imagen del gato.
 *                   description:
 *                     type: string
 *                     description: Descripción del gato.
 *       500:
 *         description: Error al obtener la lista de gatos.
 */
router.get("/readall", catController.readAll);

/**
 * @swagger
 * /cats/readone/{id}:
 *   get:
 *     tags:
 *       - Cats
 *     summary: Obtener un gato específico
 *     description: Devuelve los detalles de un gato específico basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del gato que se desea obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gato encontrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID único del gato.
 *                 name:
 *                   type: string
 *                   description: Nombre del gato.
 *                 age:
 *                   type: string
 *                   description: Edad del gato.
 *                 gender:
 *                   type: string
 *                   description: Género del gato.
 *                 img:
 *                   type: string
 *                   description: URL de la imagen del gato.
 *                 description:
 *                   type: string
 *                   description: Descripción del gato.
 *       400:
 *         description: ID inválido.
 *       404:
 *         description: Gato no encontrado.
 *       500:
 *         description: Error al obtener el gato.
 */
router.get("/readone/:id", catController.readOne);

/**
 * @swagger
 * /cats/update/{id}:
 *   put:
 *     tags:
 *       - Cats
 *     summary: Actualizar información de un gato
 *     description: Actualiza los detalles de un gato en la base de datos, basado en el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del gato que se desea actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del gato.
 *               age:
 *                 type: string
 *                 description: Edad del gato.
 *               gender:
 *                 type: string
 *                 description: Género del gato.
 *               img:
 *                 type: string
 *                 description: URL de la imagen del gato.
 *               description:
 *                 type: string
 *                 description: Descripción del gato.
 *     responses:
 *       200:
 *         description: Gato actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del gato actualizado.
 *                 name:
 *                   type: string
 *                   description: Nombre del gato.
 *                 age:
 *                   type: string
 *                   description: Edad del gato.
 *                 gender:
 *                   type: string
 *                   description: Género del gato.
 *                 img:
 *                   type: string
 *                   description: URL de la imagen del gato.
 *                 description:
 *                   type: string
 *                   description: Descripción del gato.
 *       404:
 *         description: Gato no encontrado.
 *       500:
 *         description: Error al actualizar el gato.
 */
router.put("/update/:id", catController.updateCat);

/**
 * @swagger
 * /cats/delete/{id}:
 *   delete:
 *     tags:
 *       - Cats
 *     summary: Eliminar un gato
 *     description: Elimina un gato de la base de datos según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del gato que se desea eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gato eliminado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de la eliminación.
 *                 catEliminado:
 *                   type: object
 *                   description: Datos del gato eliminado, incluyendo su `_id` y otros detalles.
 *       404:
 *         description: Gato no encontrado.
 *       500:
 *         description: Error al intentar eliminar el gato.
 */
router.delete("/delete/:id", catController.deleteCat);

module.exports = router;