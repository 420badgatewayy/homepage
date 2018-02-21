import sizeToFit from 'utils/size-to-fit';
import aspect from "constants/aspect";
const aspectRatio = aspect.x / aspect.y;
const fn = () => {};

export default (options={}) => {
  let resize_cb = fn;
  const animations = new Map();
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
    options.cameraPosition ? options.cameraPosition.z : 7,
  );

  
  const toolbelt = {
    attach(domElement, cb) {
      window.addEventListener('resize', _setRenderSize);
      domElement.appendChild(renderer.domElement);
      renderer.domParent = domElement;
      resize_cb = cb || fn;
      _setRenderSize();
    },
  
    detach(domElement) {
      window.removeEventListener('resize', _setRenderSize);
      renderer.domParent.removeChild(renderer.domElement);
      renderer.domParent = null;
    },
  
    addAnimation(animation) {
      animations.set(animation, true);
      animation.create();
    },
  
    async removeAnimation(animation) {
      await animation.destroy();
      animations.delete(animation);
    },

    updateAnimations(deltaTime) {
      animations.forEach((isRunning, animation) => {
        if (isRunning) animation.update(deltaTime)
      });
    },

    draw(){
      renderer.render(scene, camera);
    }
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
    camera.updateProjectionMatrix();
    renderer.setSize(x,y);
    resize_cb && resize_cb({x, y});
  };

}
