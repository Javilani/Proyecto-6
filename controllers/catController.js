const express = require('require');
const Cat = require('../models/Cat');

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
        res.json(cats);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// Obtener gato por ID
const readOne = async (req, res) => {
    try {
        const cat = await Cat.findById(req.params.id);
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
    try {
        const catEliminado = await Cat.findByIdAndDelete(req.params.id);
        if(!catEliminado) {
            return res.status(404).json({ message: "Gato no encontrado" });
        }
        res.status({ 
            message: "Gato eliminado", 
            catEliminado
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createCat, readAll, readOne, updateCat, deleteCat };