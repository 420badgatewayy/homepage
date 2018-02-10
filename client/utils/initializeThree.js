import resize from 'utils/resize';

export default selector => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({antialias: true});
  
  camera.position.z = 4;
  renderer.setClearColor('#ffffff');
  renderer.setSize(window.innerWidth, 9 / 16 * window.innerWidth);
  
  document.querySelector(selector).appendChild(renderer.domElement);
  window.addEventListener('resize', () => resize(renderer));
  resize(renderer);

  return {
    scene,
    camera,
    renderer
  };
}