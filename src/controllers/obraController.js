const Obra = require('../models/obraModel');

exports.getObras = (req, res) => {
    Obra.findAll((err, obras) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send("Erro no servidor.");
        }
        res.json(obras);
    });
};

exports.createObra = (req, res) => {
    const { name, status, 'date-start': dateStart, 'date-end': dateEnd, nameClient, numberPhoneClient } = req.body;
    const capaPath = req.file ? req.file.path : null;

    const data = {
        name,
        status,
        dateStart,
        dateEnd,
        capaPath,
        nameClient,
        numberPhoneClient
    };

    Obra.create(data, (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send("Erro ao registrar os dados.");
        }
        res.redirect('/admin');
    });
};
