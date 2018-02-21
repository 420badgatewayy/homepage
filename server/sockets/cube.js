const state = {
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
}

const onClientConnect = client => {
  console.log('client connected');
  client.emit('connection', state);

  client.on('input', data => {
    if(data.keys.ArrowRight) state.position.x += data.deltaTime * .001;
    if(data.keys.ArrowLeft)  state.position.x -= data.deltaTime * .001;
    if(data.keys.ArrowUp)    state.position.y += data.deltaTime * .001;
    if(data.keys.ArrowDown) state.position.y -= data.deltaTime * .001;
    client.emit('state_change', state);
  });

  
  client.on('disconnect', onClientDisconnect);
}

const onClientDisconnect = client => {
  console.log('client disconnected');
}

module.exports = function(path, io) {
  io.of(path).on('connection', onClientConnect);
}