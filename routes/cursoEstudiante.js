const { Router } = require('express');

const { getCursoEstudiante, getCursoEstudiantes, postCursoEstudiante, putCursoEstudiante, deleteCursoEstudiante } = require('../controllers/cursoEstudiante');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar/:id', getCursoEstudiante);

router.get('/mostrar', getCursoEstudiantes);

router.post('/agregar', postCursoEstudiante)

router.put('/actualizar/:id', putCursoEstudiante)

router.delete('/eliminar/:id', deleteCursoEstudiante)

module.exports = router;