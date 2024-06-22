const fs = require('fs');
const db = require('../db/database');

class Obra {
    static create(data, callback) {
        const { name, status, dateStart, dateEnd, capaPath, nameClient, numberPhoneClient } = data;
        const capa = capaPath ? fs.readFileSync(capaPath) : null;

        db.run(`INSERT INTO obras (nome_da_obra, status_da_obra, data_inicio, data_fim, capa, nome_cliente, telefone_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [name, status, dateStart, dateEnd, capa, nameClient, numberPhoneClient], 
        function(error) {
            if (capaPath) fs.unlinkSync(capaPath); // remove temporary file after reading
            callback(error);
        });
    }

    static findAll(callback) {
        db.all(`SELECT * FROM obras`, [], (error, rows) => {
            if (error) return callback(error);
            rows.forEach(row => {
                if (row.capa) row.capa = Buffer.from(row.capa).toString('base64');
            });
            callback(null, rows);
        });
    }

    static findById(id, callback) {
        db.get(`SELECT * FROM obras WHERE id = ?`, [id], (error, row) => {
            if (error) return callback(error);
            if (row && row.capa) {
                row.capa = Buffer.from(row.capa).toString('base64');
            }
            callback(null, row);
        });
    }

    static updateById(id, data, callback) {
        const { name, status, dateStart, dateEnd, capaPath, nameClient, numberPhoneClient } = data;
        const capa = capaPath ? fs.readFileSync(capaPath) : null;

        db.run(`UPDATE obras SET nome_da_obra = ?, status_da_obra = ?, data_inicio = ?, data_fim = ?, capa = ?, nome_cliente = ?, telefone_cliente = ? WHERE id = ?`, 
        [name, status, dateStart, dateEnd, capa, nameClient, numberPhoneClient, id], 
        function(error) {
            if (capaPath) fs.unlinkSync(capaPath);
            callback(error);
        });
    }

    static deleteById(id, callback) {
        db.run(`DELETE FROM obras WHERE id = ?`, [id], function(error) {
            callback(error);
        });
    }
}

module.exports = Obra;
