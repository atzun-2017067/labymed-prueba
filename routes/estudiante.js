const { Router } = require('express');

const { getEstudiantes, getEstudiante, postEstudiante, putEstudiante, deleteEstudiante } = require('../controllers/estudiante');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getEstudiantes);

router.get('/mostrar/:id', validarJWT, getEstudiante);

router.post('/agregar', postEstudiante)

router.put('/editar/:idEstudiante', putEstudiante)

router.delete('/eliminar/:id', deleteEstudiante)

module.exports = router;