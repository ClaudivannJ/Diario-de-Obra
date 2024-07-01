require('dotenv').config();
const sequelize = require('./sequelize');  
const User = require('../models/userModel'); 

const initializeDatabase = async () => {
    try {

        await sequelize.authenticate();
   
        await sequelize.sync({ force: false });
     
        const [user, created] = await User.findOrCreate({
            where: { email: process.env.DB_USER_ADMIN},
            defaults: { password: process.env.DB_PASSWORD_USER },
        });

        if (created) {
            console.log('Usuário padrão inserido com sucesso:');
        } else {
            console.log('Usuário padrão já existe:');
        }

        console.log('Banco de dados sincronizado.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    } finally {
        console.log('Fechando a conexão com o banco de dados...');
        await sequelize.close();
    }
};

initializeDatabase();
