const db = require('../db/database');

class User {
    static findByEmailAndPassword(email, password, callback) {
        db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (error, row) => {
            callback(error, row);
        });
    }
}

module.exports = User;
