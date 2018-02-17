const io = require('socket.io-client');

export default () => {
  let socket = io({
    autoConnect: false
  });

  const getSocket = () => socket;

  const attach = (setup, actions) => {
    setup.open(socket, state);
  }

  const open = path => {
    socket = io(path);
    socket.open();
  };

  const close = () => {
    socket.close();
  };

  const send = (...args) => {
    socket.send(...args);
  };

  const emit = (...args) => {
    socket.emit(...args);
  };

  const on = (...args) => {
    socket.on(...args);
  };

  return {
    getSocket,
    open,
    close,
    send,
    emit,
    on,
  };
}