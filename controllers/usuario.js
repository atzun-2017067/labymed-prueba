const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");

const getUsuarios = async (req = request, res = response) => {
  try {
    const listaUsuarios = await Usuario.find({
      rol: "administrador",
    });
    res.status(200).json(listaUsuarios);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const postUsuario = async (req = request, res = response) => {
  const { nombreUsuario, password, rol } = req.body;

  const idAutomatically = Math.floor(Math.random() * 1000000);

  try {
    const usuario = new Usuario({
      idUsuario: idAutomatically,
      nombreUsuario,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      rol,
    });

    await usuario.save();

    res.status(201).json({
      ok: true,
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};
const adminPorDefecto = async () => {
  try {
    const usuario = new Usuario();
    const idAutomatically = Math.floor(Math.random() * 1000000);
    usuario.nombreUsuario = "ADMIN";
    usuario.password = "ADMIN";
    usuario.rol = "ADMINISTRADOR";

    // Check if the user already exists
    const usuarioEncontrado = await Usuario.findOne({
      where: { nombreUsuario: usuario.nombreUsuario },
    });

    if (usuarioEncontrado) {
      console.log("EL ADMIN YA EXISTE");
    } else {
      // Hash the password (assuming you have bcrypt configured)
      usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync());

      // Save the new user
      const savedUsuario = await usuario.save();
      if (savedUsuario) {
        console.log("EL ADMIN ESTÁ LISTO");
      } else {
        console.log("ERROR AL CREAR EL ADMIN");
      }
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
};

module.exports = {
  getUsuarios,
  postUsuario,
  adminPorDefecto
};
