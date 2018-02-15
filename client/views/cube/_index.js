import style from "./style.css";
import { setTimeout } from "timers";
// import cube_socket from "sockets/cube";

const onCreate = (el, state, actions, three, socket) => {
  const {
    scene,
    camera,
    renderer,
    toolbelt,
  } = three;
  toolbelt.attachScene(el);
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
  socket.open('/cube')
  socket.on('connection', ()=> console.log('socket connected'));
};

export const Cube = ({state, actions, three, socket}) => {
  setTimeout(actions.$next_stage, 1000)
  return(
    <div key="cube" 
      className={style.scene} 
      oncreate={el => onCreate(el, state, actions, three, socket)}
      ondestroy={()=> socket.close()}
    />
  )
};
