import style from "./style.css";
import cube_animation from "game/animations/cube.js"
import cube_socket from "sockets/cube";

const onCreate = (el, props) => {
  const { state, actions, three, socket, loop } = props;
  const animation = cube_animation(three, actions);

  three.toolbelt.addAnimation(animation);
  three.toolbelt.attach(el);
  
  loop();

  socket.open('/cube');
  socket.on('connection', ()=> console.log('socket connected'));
  socket.on('disconnect', ()=> console.log('socket disconnected'));

  window.addEventListener('keydown', actions.input.keyboard.onKeyDown);
  window.addEventListener('keyup',actions. input.keyboard.onKeyUp);
  window.next = actions.global._next_stage;
};

const onDestroy = (el, props) => {
  const { state, actions, three, socket, loop } = props;
  socket.close();

  window.removeEventListener('keydown', actions.input.keyboard.onKeyDown)
  window.removeEventListener('keyup', actions.input.keyboard.onKeyUp)

  loop.stop();
};

export const Cube = props => {
  return(
    <div>
      <div key="cube" 
        className={style.scene} 
        oncreate={el => onCreate(el, props)}
        ondestroy={el => onDestroy(el, props)}
      />
    </div>
  )
};
