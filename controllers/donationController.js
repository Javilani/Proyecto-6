const Donation = require('../models/Donation');
const mongoose = require('mongoose');

// Crear una opción de donación
const createDonation = async (req, res) => {
    const { name, price } = req.body;

    try {
        const donation = new Donation({ name, price });
        const newDonation = await donation.save();
        res.status(200).json( {
            message: "Donación creada con éxito",
            newDonation
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las opciones de donación
const readAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find();
        if (donations === 0) {
            return res.status(404).json({ message: "No hay donaciones disponibles" });
        }
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// Obtener una opción de donación por ID
const readOneDonation = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    try {
        const donation = await Donation.findById(id);
        if (!donation) {
            return res.status(404).json({ message: "Donación no encontrada" });
        }
        res.json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// Actualizar una donación
const updateDonation = async (req, res) => {
    const { name, price } = req.body;
    try {
        const donation = await Donation.findByIdAndUpdate(req.params.id, { name, price }, {
            new: true,
        });
        if (!donation) {
            return res.status(404).json({ message: "Donación no encontrada"});
        }
        res.json({
            message: "Donación actualizada con éxito",
            donation
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Hubo un error en la búsqueda",
            error });
    }
};

// Eliminar una donación
const deleteDonation = async (req, res) => {
    const { id } = req.params;
    try {
        const donacionEliminada = await Donation.findByIdAndDelete(id);
        if (!donacionEliminada) {
            return res.status(404).json({ message: "Donación no encontrada" });
        }
        res.status(200).json({
            message: "Donación eliminada",
            donacionEliminada
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createDonation, readAllDonations, readOneDonation, updateDonation, deleteDonation };