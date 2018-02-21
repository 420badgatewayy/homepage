const io = require('socket.io-client');

export default () => {
  let socket = io({
    autoConnect: false
  });

  return {
    getSocket() {
      return socket;
    },
    
    open(path) {
      socket = io(path);
      socket.open();
    },
  
    close() {
      socket.close();
    },
  
    send(...args) {
      socket.send(...args);
    },
  
    emit(...args) {
      socket.emit(...args);
    },
  
    on(...args) {
      socket.on(...args);
    },
  
    update(deltaTime) {
      console.warn('no update method attached to socket');
      return deltaTime;
    }
  };
}