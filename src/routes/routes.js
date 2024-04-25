const { Router } = require("express");
const cursoRoutes = require("./cursos.route");
const loginRoutes = require("./login.route");
const usuarioRoutes = require("./usuarios.route");

const routes = Router()

routes.use('/usuarios', usuarioRoutes)
routes.use('/cursos', cursoRoutes)
routes.use('/login', loginRoutes)

module.exports = routes