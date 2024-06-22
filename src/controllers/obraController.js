const Obra = require('../models/obraModel');

exports.getObras = (req, res) => {
    Obra.findAll((error, obras) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: "Erro no servidor." });
        }
        res.json(obras);
    });
};

exports.getObrasById = (req, res) => {
    const { id } = req.params;

    Obra.findById(id, (error, obra) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        res.json(obra);
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

    Obra.create(data, (error) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: "Erro ao registrar os dados." });
        }
        res.json({ message: "Obra criada com sucesso!" });
    });
};

exports.updateObra = (req, res) => {
    const { id } = req.params;
    console.log('Updating obra with ID:', id);
    console.log('Request body:', req.body);

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

    Obra.updateById(id, data, (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro ao atualizar o banco de dados' });
        }
        res.json({ message: "Obra atualizada com sucesso!" });
    });
};

exports.deleteObra = (req, res) => {
    const { id } = req.params;

    Obra.deleteById(id, (error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro ao deletar obra do banco de dados' });
        }
        res.json({ message: "Obra deletada com sucesso!" });
    });
};
