import io from 'socket.io-client';

export default (path, state, actions) => {
  const socket = io(path);
  socket.on('connection', ()=> console.log('socket connected'))
  return socket;
}