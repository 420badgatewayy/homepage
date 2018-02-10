import initialize from 'utils/initializeThree';

const {
  scene,
  camera,
  renderer
} = initialize('#container');

renderer.render(scene, camera);