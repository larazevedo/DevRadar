const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    // Toda vez que um usuário novo se cadastrar:
    connections.push({
      id: socket.id,
      coordinates: {
        // Confere se está perto dessas coordenadas
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      // E se usa alguma dessas techs  
      techs: parseStringAsArray(techs),
    })
  })
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    // Comparando coordenadas do novo dev cadastrado com as armazenadas dentro das conexões
    return calculateDistance(coordinates, connection.coordinates) < 10
    // Some: true caso haja uma condição verdadeira
    && connection.techs.some(item => techs.includes(item))
  })
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  })
}