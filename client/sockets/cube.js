export default {
  create(socket, actions) {
    socket.open('/cube');
    let clicked = false;
    let scene_size = {x:0, y:0};
    
    socket.update = (deltaTime) => {
      // const keyboard = actions.get_state().input.keyboard;
      // const keys = Object.keys(keyboard).reduce((a,key)=>{
      //   if(keyboard[key]) a[key] = true;
      //   return a;
      // }, {});
      // if (Object.keys(keys).length) socket.emit('input', {keys, deltaTime});
      const state = actions.get_state();
      const mouse = state.input.mouse;
      if (scene_size !== state.global._scene_size) {
        scene_size = state.global._scene_size;
        socket.emit('resize', scene_size);
      }
      if (!clicked && !mouse.clicked) return;
      clicked = mouse.clicked;
      socket.emit('input', {mouse, deltaTime});
    };

    socket.on('connection', state => {
      socket.emit('initial_pos', actions.get_state().global._scene_size);
      actions.cube.position.copy(state.position);
    });

    socket.on('state_change', state => {
      console.log(state);
      actions.cube.rotation.copy(state.rotation);
      // actions.cube.position.copy(state.position);      
    });

  },

  destroy(socket) {
    socket.close();
  },

};