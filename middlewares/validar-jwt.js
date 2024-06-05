const Usuario = require ('../models/usuario');

const  jwt  = require('../helpers/generar-jwt');
const { response, request } = require('express');

validarJWT = async (req, res, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid } = jwt.verify( token, process.env.KEY_TOKEN);
        const usuario = await Usuario.findById( uid );
        if ( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB fisicamente'
            })
        }
        req.usuario = usuario; 
        next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }
};

module.exports = { validarJWT }