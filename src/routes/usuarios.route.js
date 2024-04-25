const { Router } = require("express");
const { auth } = require("../middleware/auth");
const Usuario = require("../models/Usuario");

const usuarioRoutes = new Router();

usuarioRoutes.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const nome = req.body.nome;
    const data_nascimento = req.body.data_nascimento;
    const tipo = req.body.tipo;

    if (!email) {
      return res.status(400).json({ message: "O email é obrigatório" });
    }

    if (!password) {
      return res.status(400).json({ message: "O password é obrigatório" });
    }

    if (!nome) {
      return res.status(400).json({ message: "O nome é obrigatório" });
    }

    if (!data_nascimento) {
      return res
        .status(400)
        .json({ message: "A data de nascimento é obrigatória" });
    }

    if (!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
      return res.status(400).json({
        message: "A data de nascimento é não está no formato correto",
      });
    }

    if (!tipo) {
      return res.status(400).json({
        message: "O tipo é necessário (Professor ou Aluno)",
      });
    }

    const usuario = await Usuario.create({
      email: email,
      password: password,
      nome: nome,
      data_nascimento: data_nascimento,
      tipo: tipo,
    });

    res.status(201).json(usuario);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Não possível cadastrar o usuário" });
  }
});

usuarioRoutes.get("/", auth, async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

usuarioRoutes.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: "Não possível listar o usuário especificado",
      error: error,
    });
  }
});

usuarioRoutes.delete("/:id", auth, (req, res) => {
  try {
    const { id } = req.params;

    Usuario.destroy({
      where: {
        id: id,
      },
    });

    res.status(204).json({});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Não possível deletar o usuário" });
  }
});

usuarioRoutes.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    Usuario.update(req.body);

    await Usuario.save();

    res.json(usuario);

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Não possível atualizar o usuário" });
  }
});

module.exports = usuarioRoutes;
