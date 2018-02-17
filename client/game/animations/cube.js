import create_loop from 'utils/game-loop';

export default (three, actions) => {
  const {
    scene,
    camera,
    renderer,
    toolbelt,
  } = three;
  
  const get_state = () => ({
    ...actions.cube.get_state(),
    ...actions.input.keyboard.get_state()
  });

  const loop = create_loop({update, draw});

  const geometry = new THREE.BoxGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const cube = new THREE.Mesh( geometry, material );

  function create() {
    scene.add( cube );
    toolbelt.destroy = destroy;
    loop();
  };

  function update(deltaTime) {
    const {position, rotation} = get_state();
    cube.rotation.setFromVector3(rotation);
    cube.position.copy(position);

    actions.cube.rotation.incr_x(0.0005 * deltaTime);
    actions.cube.rotation.incr_y(0.00075 * deltaTime);

    if (get_state().ArrowUp){
      actions.cube.position.incr_y(.001 * deltaTime);
    }
    if (get_state().ArrowDown){
      actions.cube.position.incr_y(-.001 * deltaTime);
    }
    if (get_state().ArrowLeft){
      actions.cube.position.incr_x(-.001 * deltaTime);
    }
    if (get_state().ArrowRight){
      actions.cube.position.incr_x(.001 * deltaTime);
    }
  };

  function draw() {
    renderer.render(scene, camera);
  };

  function destroy() {
    scene.remove(cube);
    loop.stop();
  };

  return {
    create,
    update,
    draw,
  }

}