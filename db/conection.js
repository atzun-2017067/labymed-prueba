const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "sqlite",
});

dbConnection
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa a la base de datos SQLite");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

const sincronizarModelo = async() => {
    try {
      await dbConnection.sync(); // Sincroniza todos los modelos definidos
      console.log("Modelos sincronizado correctamente con la base de datos.");
    } catch (error) {
      console.error("Error al sincronizar el modelo:", error);
    }
  }

module.exports = {
  dbConnection,
  sincronizarModelo
};
