//importa somente a parte de rotas do express
const  { Router } = require('express');
const DevController = require('./Controllers/DevController');
const SerchController = require('./Controllers/SerchController')

const routes = Router();   
routes.get('/devs', DevController.index); 
routes.post('/devs', DevController.store);
routes.get('/search', SerchController.index);
//exporar as rotas para serem usadas
module.exports = routes;