const { DataTypes } = require("sequelize");
const { dbConnection } = require("../db/conection");

const Curso = dbConnection.define("Curso", {
  idCurso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreCurso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  catedratico: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Curso;
