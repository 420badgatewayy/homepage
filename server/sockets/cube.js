const onClientConnect = client => {
  console.log('client connected');
  client.emit('connection')


  
  client.on('disconnect', onClientDisconnect);
}

const onClientDisconnect = client => {
  console.log('client disconnected');
}

module.exports = function(path, io) {
  io.of(path).on('connection', onClientConnect);
}