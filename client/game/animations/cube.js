export default (three, actions) => {
  const {
    scene,
    camera,
    renderer,
    toolbelt,
  } = three;

  const cube = new THREE.Group();
  _createFaces(cube);

  // new Array(6).fill().forEach((_,side) => {
  //   const group = new THREE.Group()
  //   new Array(9).fill().forEach((_, segment) => {
  //     const geometry = new THREE.PlaneBufferGeometry(1,1);
  //     const color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  //     const material = new THREE.MeshBasicMaterial({color, side: THREE.DoubleSide});
  //     const mesh = new THREE.Mesh(geometry, material);
  //     mesh.position.copy(_getPositionForSegment(segment));
  //     group.add(mesh);
  //   });
  //   group.position.copy(_getPositionForSide(side));
  //   group.rotation.setFromVector3(_getRotationForSide(side));
  //   cube.add(group);
  // });

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
  
      actions.cube.rotation.incr_x(0.0001 * deltaTime);
      actions.cube.rotation.incr_y(0.00075 * deltaTime);
      
    },
  
    destroy() {
      return new Promise((res, rej) => {
        scene.remove(cube);
        res();
      });
    },
  }
}

const PI = Math.PI;

function _createFaces(cube){
  return new Array(6).fill().forEach((_,side) => {
    const group = new THREE.Group()
    new Array(9).fill().forEach((_, segment) => {
      const geometry = new THREE.PlaneBufferGeometry(1,1);
      const color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
      const material = new THREE.MeshBasicMaterial({color, side: THREE.DoubleSide});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(_getPositionForSegment(segment));
      group.add(mesh);
    });
    group.position.copy(_getPositionForSide(side));
    group.rotation.setFromVector3(_getRotationForSide(side));
    cube.add(group);
  });
}

function _getPositionForSegment(index) {
  return {
    x: 1 - index % 3,
    y: Math.floor(index / 3) - 1,
    z: 0,
  };
};

function _getRotationForSide(index) {
  return [
    {x: 0,       y: 0,       z: 0},
    {x: 0,       y: PI / 2,  z: 0},
    {x: PI / 2,  y: 0,       z: 0},
    {x: 0,       y: PI,      z: 0},
    {x: -PI / 2, y: 0,       z: 0},
    {x: 0,       y: -PI / 2, z: 0},
  ][index];
};

function _getPositionForSide(index) {
  return [
    {x: +0.0, y: +0.0, z: +1.5},
    {x: +1.5, y: +0.0, z: +0.0},
    {x: +0.0, y: +1.5, z: +0.0},
    {x: +0.0, y: +0.0, z: -1.5},
    {x: +0.0, y: -1.5, z: +0.0},
    {x: -1.5, y: +0.0, z: +0.0},
  ][index];
};