import style from "./style.css";
import create_loop from 'utils/game-loop';
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

  const update = deltaTime => {  
    cube.rotation.x += 0.0005 * deltaTime;
    cube.rotation.y += 0.00075 * deltaTime;
  }

  const draw = () => {
    renderer.render(scene, camera);
  }
  
  const loop = create_loop({update, draw});
  loop();

  window.addEventListener('click', () => {
    loop.isRunning() ? loop.stop() : loop.run();
  });

  socket.open('/cube')
  socket.on('connection', ()=> console.log('socket connected'));
  socket.on('disconnect', ()=> console.log('socket disconnected'));
};

export const Cube = ({state, actions, three, socket}) => {
  return(
    <div>
      <div key="cube" 
        className={style.scene} 
        oncreate={el => onCreate(el, state, actions, three, socket)}
      />
    </div>
  )
};
