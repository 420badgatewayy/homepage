export default (three, actions) => {
  const {
    scene,
    camera,
    renderer,
    toolbelt,
  } = three;

  const geometry = new THREE.BoxGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const cube = new THREE.Mesh( geometry, material );

  function create() {
    scene.add( cube );
  };

  function update(deltaTime) {
    const state = {
      ...actions.cube.get_state(),
      ...actions.input.get_state(),
    };

    cube.rotation.setFromVector3(state.rotation);
    cube.position.copy(state.position);

    actions.cube.rotation.incr_x(0.0005 * deltaTime);
    actions.cube.rotation.incr_y(0.00075 * deltaTime);

    state.keyboard.ArrowUp && actions.cube.position.incr_y(.001 * deltaTime);
    state.keyboard.ArrowDown && actions.cube.position.incr_y(-.001 * deltaTime);
    state.keyboard.ArrowLeft && actions.cube.position.incr_x(-.001 * deltaTime);
    state.keyboard.ArrowRight && actions.cube.position.incr_x(.001 * deltaTime);
    
  };

  function destroy() {
    return new Promise((res, rej) => {
      scene.remove(cube);
      res();
    });
  };

  return {
    create,
    update,
    destroy,
  }

}