const Client = require(__base+"games/cube/client");

const get_initial_state = () => ({
  mouse: {
    clicked: false,
    x: 0,
    y: 0,
  },

  scene: {
    x: 0,
    y: 0,
  },

  position: {
    x: 0,
    y: 0,
    z: 0,
  },

  rotation: {
    x: 0,
    y: 0,
    z: 0
  }
});

function onClientConnect(socket) {
  console.log('client connected');
  const client = new Client(socket);

  socket.emit('connection', client.state);
  socket.on('resize', data=>client.setSize(data));
  socket.on('input', data => client.handleInput(data));
  socket.on('disconnect', () => onClientDisconnect(socket));
}

const onClientDisconnect = client => {
  console.log('client disconnected');
}

module.exports = function(path, io) {
  io.of(path).on('connection', onClientConnect);
}