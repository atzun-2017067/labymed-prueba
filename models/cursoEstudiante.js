const { DataTypes } = require('sequelize');
const { dbConnection } = require('../db/conection');

const CursoEstudiante = dbConnection.define('CursoEstudiante', {
  idCursoEstudiante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idEstudiante: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idCurso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = CursoEstudiante;
