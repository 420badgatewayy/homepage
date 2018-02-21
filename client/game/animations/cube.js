import createCubeFaces from "utils/cube";

export default (three, actions) => {
  const {
    scene,
    camera,
    renderer,
    toolbelt,
  } = three;

  const cube = new THREE.Group();
  createCubeFaces(cube);

  return {
    create() {
      scene.add( cube );
    },
  
    update(deltaTime) {
      const state = {
        ...actions.cube.get_state(),
        ...actions.input.get_state(),
      };
  
      cube.rotation.setFromVector3(state.rotation);
      cube.position.copy(state.position);
  
      // actions.cube.rotation.incr_x(0.0001 * deltaTime);
      // actions.cube.rotation.incr_y(0.00075 * deltaTime);
      // actions.cube.rotation.incr_z(-.00045 * deltaTime);
    },
  
    destroy() {
      return new Promise((res, rej) => {
        scene.remove(cube);
        res();
      });
    },
  }
};