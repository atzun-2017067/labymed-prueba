require('dotenv').config();

const Server = require('./server');

const servidorIniciado = new Server();

servidorIniciado.listen();