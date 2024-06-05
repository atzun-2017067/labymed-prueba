const { request, response } = require("express");

const Curso = require("../models/curso");

const getCursos = async (req = request, res = response) => {
  const cursos = await Curso.findAll();

  res.status(200).json({
    ok: true,
    cursos
  });
};

const getCurso = async (req = request, res = response) => {
  const { id } = req.params;

  const curso = await Curso.findByPk(id);

  res.status(200).json({
    ok: true,
    curso,
  });
};

const postCurso = async (req = request, res = response) => {
  const { nombreCurso, catedratico } = req.body;

  const idAutomatically = Math.floor(Math.random() * 1000000);

  try {
    const curso = new Curso({
      idCurso: idAutomatically,
      nombreCurso,
      catedratico,
    });

    await curso.save();

    res.status(201).json({
      ok: true,
      curso,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const putCurso = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombreCurso, catedratico } = req.body;

  try {
    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(404).json({
        ok: false,
        msg: "Curso no encontrado",
      });
    }

    curso.nombreCurso = nombreCurso;
    curso.catedratico = catedratico;

    await curso.save();

    res.status(201).json({
      ok: true,
      curso,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const deleteCurso = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(404).json({
        ok: false,
        msg: "Curso no encontrado",
      });
    }

    await curso.destroy();

    res.status(200).json({
      ok: true,
      msg: "Curso eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

module.exports = {
  getCursos,
  getCurso,
  postCurso,
  putCurso,
  deleteCurso,
};