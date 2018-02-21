const PI = Math.PI;

function createCubeFaces(cube){
  return new Array(6).fill().forEach((_,side) => {
    const group = new THREE.Group()
    new Array(9).fill().forEach((_, segment) => {
      const geometry = new THREE.PlaneBufferGeometry(1,1);
      const color = ["brown","red","orange","yellow","green","blue","indigo","violet","black"][segment];
      const material = new THREE.MeshBasicMaterial({color, side: THREE.DoubleSide});
      // const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(_getPositionForCubeFaceSegment(segment));
      group.add(mesh);
    });
    group.position.copy(_getPositionForCubeFace(side));
    group.rotation.setFromVector3(_getRotationForCubeFace(side));
    cube.add(group);
  });
}

function _getPositionForCubeFaceSegment(index) {
  return {
    x: index % 3 - 1,
    y: 1 - Math.floor(index / 3),
    z: 0,
  };
};

function _getRotationForCubeFace(index) {
  return [
    {x: 0,       y: 0,       z: 0},
    {x: 0,       y: PI / 2,  z: 0},
    {x: PI / 2,  y: 0,       z: 0},
    {x: 0,       y: PI,      z: 0},
    {x: -PI / 2, y: 0,       z: 0},
    {x: 0,       y: -PI / 2, z: 0},
  ][index];
};

function _getPositionForCubeFace(index) {
  return [
    {x: +0.0, y: +0.0, z: +1.5},
    {x: +1.5, y: +0.0, z: +0.0},
    {x: +0.0, y: +1.5, z: +0.0},
    {x: +0.0, y: +0.0, z: -1.5},
    {x: +0.0, y: -1.5, z: +0.0},
    {x: -1.5, y: +0.0, z: +0.0},
  ][index];
};

export default createCubeFaces;