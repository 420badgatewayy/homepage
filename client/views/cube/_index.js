import style from "./style.css";
import initializeThree from "utils/initialize-three";

const onCreate = (el) => {
  console.log('creating')
  const {
    scene,
    camera,
    renderer,
    attachScene,
    detachScene,
  } = initializeThree(el);
  attachScene();
  renderer.render(scene, camera);
};

export const Cube = ({state, actions}) => {
  return(
    <div key="cube" 
      className={style.scene} 
      oncreate={onCreate}
    />
  )
};