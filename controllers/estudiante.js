const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const Estudiante = require('../models/estudiante');

const getEstudiantes = async (req = request, res = response) => {
  const estudiantes = await Estudiante.findAll();

  res.status(200).json({
    ok: true,
    estudiantes,
  });
}

const getEstudiante = async (req = request, res = response) => {
  const { id } = req.params;

  const estudiante = await Estudiante.findByPk(id);

  res.status(200).json({
    ok: true,
    estudiante,
  });
}

const postEstudiante = async (req = request, res = response) => {
  const { nombre, apellido, nivel, seccion } = req.body;

  idAutomatically = Math.floor(Math.random() * 1000000);

  try {
    const estudiante = new Estudiante({
      id: idAutomatically,
      nombre,
      apellido,
      nivel,
      seccion,
    });

    await estudiante.save();

    res.status(201).json({
      ok: true,
      estudiante,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
}

const putEstudiante = async (req = request, res = response) => { 
  const { idEstudiante } = req.params;
  const { nombre, apellido, nivel, seccion } = req.body;

  try {
    const estudiante = await Estudiante.findByPk(idEstudiante);

    if (!estudiante) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un estudiante con ese id',
      });
    }

    estudiante.nombre = nombre;
    estudiante.apellido = apellido;
    estudiante.nivel = nivel;
    estudiante.seccion = seccion;

    await estudiante.save();

    res.status(201).json({
      ok: true,
      estudiante,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
}

const deleteEstudiante = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const estudiante = await Estudiante.findByPk(id);

    if (!estudiante) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe un estudiante con ese id',
      });
    }

    await estudiante.destroy();

    res.status(200).json({
      ok: true,
      msg: 'Estudiante eliminado',
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador',
    });
  }
}

module.exports = {
  getEstudiantes,
  getEstudiante,
  postEstudiante,
  putEstudiante,
  deleteEstudiante,
};