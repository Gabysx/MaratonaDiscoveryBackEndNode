// Biblioteca para criar o servidor
const express = require("express");

// Conexão como pacote de rotes 
const routes = express.Router();

//Importando o controller do objeto profile 
const ProfileController = require('./controllers/ProfileController');

// Importanto o controller do objeto job 
const JobController = require('./controllers/JobController');
const DashboardController = require("./controllers/DashboardController");

//request(req), response(res)
routes.get('/', DashboardController.index);

routes.get('/job', JobController.create);
routes.post('/job', JobController.save);

routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);

routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

//jogar para fora com o 
module.exports = routes;