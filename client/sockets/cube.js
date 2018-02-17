const open = (socket, state) => {
  socket.open('/cube');
  socket.on('connection', ()=> console.log('socket connected'));
  socket.on('disconnect', close);
};

const close = (socket, state) => {
  console.log('socket disconnected')
}

export default open;