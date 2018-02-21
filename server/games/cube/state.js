const THREE = require('three');

module.exports = () => ({
  position: new THREE.Vector3,
  rotation: new THREE.Euler,

  mouse: {
    clicked: false,
    x: 0,
    y: 0,
  },

  scene: {
    x: 0,
    y: 0,
  },

});