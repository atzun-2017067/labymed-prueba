const { Router } = require('express');

const { getUsuarios, postUsuario } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', validarJWT,  getUsuarios);

router.post('/agregar', postUsuario)

module.exports = router;