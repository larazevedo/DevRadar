const { Router} = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Rota para listar usuários criados
routes.get('/devs', DevController.index);

// Rota para criar um usuário
routes.post('/devs', DevController.store);

// Rota para a busca
routes.get('/search', SearchController.index);

// Exportando rotas
module.exports = routes;