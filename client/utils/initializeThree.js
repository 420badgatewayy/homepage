import sizeToFit from 'utils/sizeToFit';
import aspect from "constants/aspect";
const aspectRatio = aspect.x / aspect.y;

export default (selector, options={}) => {
  const domElement = document.querySelector(selector);
  const renderer = new THREE.WebGLRenderer({antialias: true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    options.fov || 75, 
    options.cameraAspect || aspectRatio, 
    0.1, 
    1000
  );

  renderer.setClearColor(options.clearColor || '#ffffff');
  camera.position = options.cameraPosition || new THREE.Vector3(0,0,4);

  const _setRenderSize = () => {
    const {offsetWidth, offsetHeight} = domElement;
    const {x, y} = sizeToFit(aspectRatio, offsetWidth, offsetHeight);
    renderer.setSize(x,y);
  };

  const attachScene = () => {
    window.addEventListener('resize', _setRenderSize);
    _setRenderSize();
    return domElement.appendChild(renderer.domElement);
  }

  const detachScene = () => {
    window.removeEventListener('resize', _setRenderSize);
    return domElement.removeChild(renderer.domElement);
  }

  return {
    scene,
    camera,
    renderer,
    attachScene,
    detachScene,
  };
  
}
