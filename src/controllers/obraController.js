const Obra = require('../models/obraModel');
const fs = require('fs');

exports.getObras = async (req, res) => {
    try {
        const obras = await Obra.findAll();
        obras.forEach(obra => {
            if (obra.capa) {
                obra.capa = obra.capa.toString('base64');
            }
        });
        res.json(obras);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: "Server error." });
    }
};

exports.getObrasById = async (req, res) => {
    try {
        const { id } = req.params;
        const obra = await Obra.findByPk(id);
        if (!obra) {
            return res.status(404).json({ error: 'Obra not found.' });
        }
        if (obra.capa) {
            obra.capa = obra.capa.toString('base64');
        }
        res.json(obra);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server error.' });
    }
};

exports.createObra = async (req, res) => {
    try {
        const { name, status, 'dateStart': dateStart, 'dateEnd': dateEnd, nameClient, numberPhoneClient } = req.body;
        const capaPath = req.file ? req.file.path : null;
        const capa = capaPath ? fs.readFileSync(capaPath) : null;

        const newObra = await Obra.create({
            name,
            status,
            dateStart,
            dateEnd,
            capa,
            nameClient,
            numberPhoneClient
        });

        if (capaPath) fs.unlinkSync(capaPath); 
        res.status(200).json({ message: "Obra created successfully!", obra: newObra });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: "Error saving data." });
    }
};

exports.updateObra = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status, 'dateStart': dateStart, 'dateEnd': dateEnd, nameClient, numberPhoneClient } = req.body;
        const capaPath = req.file ? req.file.path : null;
        const capa = capaPath ? fs.readFileSync(capaPath) : null;

        const obra = await Obra.findByPk(id);
        if (!obra) {
            return res.status(404).json({ error: 'Obra not found.' });
        }

        await obra.update({
            name,
            status,
            dateStart,
            dateEnd,
            capa,
            nameClient,
            numberPhoneClient
        });

        if (capaPath) fs.unlinkSync(capaPath); 
        res.json({ message: "Obra updated successfully!", obra });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error updating data.' });
    }
};


exports.deleteObra = async (req, res) => {
    try {
        const { id } = req.params;
        const obra = await Obra.findByPk(id);
        if (!obra) {
            return res.status(404).json({ error: 'Obra not found.' });
        }

        await obra.destroy();
        res.json({ message: "Obra deleted successfully!" });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error deleting data.' });
    }
};
