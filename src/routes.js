//Importando o modulo Express pra variavel Express
const express = require("express");

const ongController = require("./controllers/ongController");
const acidentes = require("./controllers/acidentes");
const perfilController = require("./controllers/perfilController");
const sessionController = require("./controllers/sessionController");
const routes = express.Router();

//Login Router
routes.post("/session", sessionController.create);

//Ongs Cadastradas
routes.get("/ongs", ongController.index);
routes.post("/ongs", ongController.create);

routes.get("/perfil", perfilController.index);

//Casos cadastrados
routes.post("/acidentes", acidentes.create);
routes.get("/acidentes", acidentes.index);

routes.delete("/acidentes/:id", acidentes.delete);

module.exports = routes;
