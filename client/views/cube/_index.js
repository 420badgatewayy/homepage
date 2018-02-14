import style from "./style.css";
import initializeThree from "utils/initialize-three";

const onCreate = (el) => {
  const {
    scene,
    camera,
    renderer,
    attachScene,
    detachScene,
  } = initializeThree();
  attachScene(el);
  const geometry = new THREE.BoxGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  const render = () =>{
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
};

export const Cube = ({state, actions}) => {
  return(
    <div key="cube" 
      className={style.scene} 
      oncreate={onCreate}
    />
  )
};
