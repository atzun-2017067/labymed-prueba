const { DataTypes } = require('sequelize');
const { dbConnection } = require('../db/conection');

const Estudiante = dbConnection.define('Estudiante', {
  idEstudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Estudiante;
