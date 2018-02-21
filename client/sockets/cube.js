export default {
  create(socket, actions) {
    socket.open('/cube');
    
    socket.update = (deltaTime) => {
      const keyboard = actions.get_state().input.keyboard;
      const keys = Object.keys(keyboard).reduce((a,key)=>{
        if(keyboard[key]) a[key] = true;
        return a;
      }, {});
      if (Object.keys(keys).length) socket.emit('input', {keys, deltaTime});
    };

    socket.on('connection', state => {
      actions.cube.position.copy(state.position);
    });

    socket.on('state_change', state => {
      actions.cube.position.copy(state.position);      
    });

  },

  destroy(socket) {
    socket.close();
  },

};