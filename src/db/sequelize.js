require('dotenv').config(); 
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME_DB, process.env.PASSWORD_DB, {
  host: 'localhost',
  dialect: 'postgres',
  // protocol: 'postgres',
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false 
  //   }
  // }
});

module.exports = sequelize;
