const { request, response } = require("express");

const CursoEstudiante = require("../models/cursoEstudiante");

const getCursoEstudiantes = async (req = request, res = response) => {
  const cursoEstudiantes = await CursoEstudiante.findAll();

  res.status(200).json({
    ok: true,
    cursoEstudiantes,
  });
};

const getCursoEstudiante = async (req = request, res = response) => {
  const { id } = req.params;

  const cursoEstudiante = await CursoEstudiante.findByPk(id);

  res.status(200).json({
    ok: true,
    cursoEstudiante,
  });
};

const postCursoEstudiante = async (req = request, res = response) => {
  const { idCurso, idEstudiante } = req.body;

  const idAutomatically = Math.floor(Math.random() * 1000000);

  try {
    const cursoEstudiante = new CursoEstudiante({
      id: idAutomatically,
      idCurso,
      idEstudiante,
    });

    await cursoEstudiante.save();

    res.status(201).json({
      ok: true,
      cursoEstudiante,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const putCursoEstudiante = async (req = request, res = response) => {
  const { id } = req.params;
  const { idCurso, idEstudiante } = req.body;

  try {
    const cursoEstudiante = await CursoEstudiante.findByPk(id);

    if (!cursoEstudiante) {
      return res.status(404).json({
        ok: false,
        msg: "CursoEstudiante no encontrado",
      });
    }

    cursoEstudiante.idCurso = idCurso;
    cursoEstudiante.idEstudiante = idEstudiante;

    await cursoEstudiante.save();

    res.status(201).json({
      ok: true,
      cursoEstudiante,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const deleteCursoEstudiante = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const cursoEstudiante = await CursoEstudiante.findByPk(id);

    if (!cursoEstudiante) {
      return res.status(404).json({
        ok: false,
        msg: "CursoEstudiante no encontrado",
      });
    }

    await cursoEstudiante.destroy();

    res.status(200).json({
      ok: true,
      msg: "CursoEstudiante eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  getCursoEstudiantes,
  getCursoEstudiante,
  postCursoEstudiante,
  putCursoEstudiante,
  deleteCursoEstudiante,
};