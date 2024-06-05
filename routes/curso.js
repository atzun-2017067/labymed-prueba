const { Router } = require('express');

const { getCursos, postCurso, putCurso, deleteCurso } = require('../controllers/curso');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/mostrar', getCursos);

router.post('/agregar', postCurso)

router.put('/editar/:id', putCurso)

router.delete('/eliminar/:id', deleteCurso)

module.exports = router;