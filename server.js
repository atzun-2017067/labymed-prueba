const express = require("express");
const cors = require("cors");

const { dbConnection, sincronizarModelo } = require("./db/conection"); // Importa la conexión a la base de datos

const {adminPorDefecto} = require("./controllers/usuario");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      usuario: "/api/usuario",
      estudiante: "/api/estudiante",
      curso: "/api/curso",
      cursoEstudiante: "/api/curso-estudiante",
    };

    this.conectarDB();
    sincronizarModelo();
    this.middlewares();
    this.routes();
    adminPorDefecto();
  }

  async conectarDB() {
    await dbConnection.authenticate();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("./routes/auth"));
    this.app.use(this.paths.usuario, require("./routes/usuario"));
    this.app.use(this.paths.estudiante, require("./routes/estudiante"));
    this.app.use(this.paths.curso, require("./routes/curso"));
    this.app.use(this.paths.cursoEstudiante, require("./routes/cursoEstudiante"));
  }

  listen() {

    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto ", this.port);
    });
  }
}

module.exports = Server;
