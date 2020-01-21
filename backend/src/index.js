const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
// Extraindo o servidor http do express
const server = http.Server(app);

// Função disparada assim que 
setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-tcofd.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors({ origin: 'http://localhost:3000' }))
// Express entende requisições cujo formato do corpo é json
app.use(express.json())
app.use(routes);

// Métodos HTTP: GET, POST, PUT, DELETE
// Query Params: req.query (Filtros, ordenação, paginação...) --> GET
// Route Params: users/:id (Identificar recurso) --> PUT/DELETE
// Body: request.body (Dados para a criação ou alteração de um registro)

server.listen(3333);