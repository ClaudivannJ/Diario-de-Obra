require('dotenv').config();

module.exports = {
    development: {
        name,
        version,
        serviceTimeout:30,
        options: {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            database: process.env.DATABASE,
            username: process.env.USERNAME_DB,
            password: process.env.PASSWORD_DB,
        },
        log: () => getLogger(name, version, 'debug'),

    },

    production: {
        name,
        version,
        
    }
}