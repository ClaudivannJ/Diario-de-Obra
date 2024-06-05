const fs = require('fs');
const db = require('../db/database');

class Obra {
    static create(data, callback) {
        const { name, status, dateStart, dateEnd, capaPath, nameClient, numberPhoneClient } = data;
        const capa = capaPath ? fs.readFileSync(capaPath) : null;

        db.run(`INSERT INTO obras (nome_da_obra, status_da_obra, data_inicio, data_fim, capa, nome_cliente, telefone_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
        [name, status, dateStart, dateEnd, capa, nameClient, numberPhoneClient], 
        function(err) {
            if (capaPath) fs.unlinkSync(capaPath); // remove temporary file after reading
            callback(err);
        });
    }

    static findAll(callback) {
        db.all(`SELECT * FROM obras`, [], (err, rows) => {
            if (err) return callback(err);
            rows.forEach(row => {
                if (row.capa) row.capa = Buffer.from(row.capa).toString('base64');
            });
            callback(null, rows);
        });
    }
}

module.exports = Obra;
