const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const postAuth = async (req = request, res = response) => {
  const { nombreUsuario, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ nombreUsuario: nombreUsuario });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - (El usuario no existe)'
            });
        }

        const validarPassword = bcrypt.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - (password incorrecta)'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.rol);
        res.json({
            msg: 'Login PATH',
            nombreUsuario,
            password: usuario.password,
            token
        })
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
}

module.exports = { postAuth }