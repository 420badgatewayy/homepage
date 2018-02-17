import sizeToFit from 'utils/size-to-fit';
import aspect from "constants/aspect";
const aspectRatio = aspect.x / aspect.y;

export default (options={}) => {
  const animations = {};
  const renderer = new THREE.WebGLRenderer({antialias: true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    options.fov || 75, 
    options.cameraAspect || aspectRatio, 
    0.1, 
    1000
  );

  renderer.setClearColor(options.clearColor || '#bbffff');
  camera.position.set(
    options.cameraPosition ? options.cameraPosition.x : 0,
    options.cameraPosition ? options.cameraPosition.y : 0,
    options.cameraPosition ? options.cameraPosition.z : 4,
  );

  function attach(domElement) {
    window.addEventListener('resize', _setRenderSize);
    domElement.appendChild(renderer.domElement);
    renderer.domParent = domElement;
    _setRenderSize();
  };

  function detach(domElement) {
    window.removeEventListener('resize', _setRenderSize);
    renderer.domParent.removeChild(renderer.domElement);
    renderer.domParent = null;
  };

  const toolbelt = {
    attach,
    detach
  };

  return {
    scene,
    camera,
    renderer,
    toolbelt,
  };
  
  function _setRenderSize() {
    const {offsetWidth, offsetHeight} = renderer.domParent;
    const {x, y} = sizeToFit(aspectRatio, offsetWidth, offsetHeight);
    renderer.setSize(x,y);
  };

}
