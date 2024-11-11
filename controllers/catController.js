const Cat = require('../models/Cat');
const mongoose = require('mongoose');

//  Crear un gato
const createCat = async (req, res) => {
    const { name, age, img, description } = req.body;

    try {
        const cat = new Cat({ name, age, img, description });
        const newCat = await cat.save();
        res.status(201).json( { 
            message: "Gato agregado con éxito",
            newCat
            });
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

// Obtener todos los gatos
const readAll = async (req, res) => {
    try {
        const cats = await Cat.find();
        console.log(cats);
        if (cats.length === 0) {
            return res.status(404).json({ message: "No hay gatos disponibles" });
        }
        res.json(cats);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// Obtener gato por ID
const readOne = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const cat = await Cat.findById(id);
        if (!cat) {
            return res.status(404).json({ message: "Gato no encontrado" });
        }
        res.json(cat);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// Actualizar un gato
const updateCat = async (req, res) => {
    const { name, age, img, description } = req.body;

    try {
        const cat = await Cat.findByIdAndUpdate(req.params.id, { name, age, img, description }, {
            new: true,
        });
        if (!cat) {
            return res.status(404).json({ message: "Gato no encontrado "});
        }
        res.json(cat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un gato
const deleteCat = async (req, res) => {
    const { id } = req.params;
    try {
        const catEliminado = await Cat.findByIdAndDelete(id);
        console.log(catEliminado);
        if(!catEliminado) {
            return res.status(404).json({ message: "Gato no encontrado" });
        }
        res.status(200).json({ 
            message: "Gato eliminado", 
            catEliminado
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCat, readAll, readOne, updateCat, deleteCat };