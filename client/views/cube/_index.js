import style from "./style.css";
import cube_animation from "game/animations/cube.js"
import cube_socket from "sockets/cube";

const onCreate = (el, state, actions, three, socket) => {
  window.next = actions._next_stage;
  const { create, update, draw } = cube_animation(three, actions);
  
  create();
  
  three.toolbelt.attach(el);

  socket.open('/cube');
  socket.on('connection', ()=> console.log('socket connected'));
  socket.on('disconnect', ()=> console.log('socket disconnected'));

  window.addEventListener('keydown', actions.input.keyboard.onKeyDown);
  window.addEventListener('keyup',actions. input.keyboard.onKeyUp);
};

const onDestroy = (el, state, actions, three, socket) => {
  socket.close();
  three.toolbelt.destroy();

  window.removeEventListener('keydown', actions.input.keyboard.onKeyDown)
  window.removeEventListener('keyup', actions.input.keyboard.onKeyUp)
};

export const Cube = ({state, actions, three, socket}) => {
  return(
    <div>
      <div key="cube" 
        className={style.scene} 
        oncreate={el => onCreate(el, state, actions, three, socket)}
        ondestroy={el => onDestroy(el, state, actions, three, socket)}
      />
    </div>
  )
};
