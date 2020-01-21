import socketio from 'socket.io-client';

// Conexão com o socket
const socket = socketio('http://192.168.15.10:3333', {
  autoConnect: false,
});

// Escuta as informações do backend que chegou um novo dev
function subscribeToNewDevs(subcribeFunction) {
  socket.on('new-dev', subcribeFunction);
}

function connect(latitude, longitude, techs) {
  socket.io.opts.query = {
    latitude,
    longitude,
    techs,
  };
  socket.connect();

}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export {
  connect,
  disconnect,
  subscribeToNewDevs,
}