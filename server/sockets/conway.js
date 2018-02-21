const onClientConnect = client => {
  console.log('conway client connected');
  client.emit('connection')


  
  client.on('disconnect', onClientDisconnect);
}

const onClientDisconnect = client => {
  console.log('client disconnected');
}

module.exports = function(path, io) {
  io.of(path).on('connection', (client)=>{
    onClientConnect(client)
  });
}