const { DataTypes } = require('sequelize');
const { dbConnection } = require('../db/conection');

// Define el modelo 'Usuario'
const Usuario = dbConnection.define('Usuario', {
  idUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
})

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = Usuario;



