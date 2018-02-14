import sizeToFit from 'utils/size-to-fit';
import aspect from "constants/aspect";
const aspectRatio = aspect.x / aspect.y;

export default (options={}) => {
  const renderer = new THREE.WebGLRenderer({antialias: true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    options.fov || 75, 
    options.cameraAspect || aspectRatio, 
    0.1, 
    1000
  );

  renderer.setClearColor(options.clearColor || '#bbffff');
  camera.position.x = options.cameraPosition ? options.cameraPosition.x : 0;
  camera.position.y = options.cameraPosition ? options.cameraPosition.y : 0;
  camera.position.z = options.cameraPosition ? options.cameraPosition.z : 4;

  const attachScene = (domElement) => {
    window.addEventListener('resize', _setRenderSize);
    renderer.domParent = domElement;
    _setRenderSize();
    return renderer.domParent.appendChild(renderer.domElement);
  }

  const detachScene = (domElement) => {
    window.removeEventListener('resize', _setRenderSize);
    return renderer.domParent.removeChild(renderer.domElement);
  }

  return {
    scene,
    camera,
    renderer,
    attachScene,
    detachScene,
  };
  
  function _setRenderSize() {
    const {offsetWidth, offsetHeight} = renderer.domParent;
    const {x, y} = sizeToFit(aspectRatio, offsetWidth, offsetHeight);
    renderer.setSize(x,y);
  };

}
