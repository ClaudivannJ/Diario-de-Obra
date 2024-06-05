const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS obras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_da_obra TEXT,
        status_da_obra TEXT,
        data_inicio DATE,
        data_fim DATE,
        capa BLOB,
        nome_cliente TEXT,
        telefone_cliente TEXT
    )`);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar a tabela de usuários:', err.message);
      } else {
        // Verifica se o usuário padrão já existe
        const defaultUser = { email: 'admin@admin', password: '123' };
        db.get(`SELECT * FROM users WHERE email = ?`, [defaultUser.email], (err, row) => {
          if (err) {
            console.error('Erro ao verificar o usuário padrão:', err.message);
          } else if (!row) {
            // Insere o usuário padrão se ele não existir
            db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [defaultUser.email, defaultUser.password], (err) => {
              if (err) {
                console.error('Erro ao inserir o usuário padrão:', err.message);
              } else {
                console.log('Usuário padrão inserido com sucesso.');
              }
            });
          } else {
            console.log('Usuário padrão já existe.');
          }
        });
      }
    });
  });

module.exports = db;
