const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Obra = sequelize.define('Obra', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateStart: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateEnd: {
    type: DataTypes.DATE,
    allowNull: false
  },
  capa: {
    type: DataTypes.BLOB
  },
  nameClient: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numberPhoneClient: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'obras',
  timestamps: false
});

module.exports = Obra;
