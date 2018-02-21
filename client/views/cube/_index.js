import style from "./style.css";
import cube_animation from "game/animations/cube.js"
import cube_socket from "sockets/cube";

const onCreate = (el, props) => {
  const { actions, three, socket, loop } = props;
  const animation = cube_animation(three, actions);

  three.toolbelt.addAnimation(animation);
  three.toolbelt.attach(el);
  
  cube_socket.create(socket, actions);

  loop();

  window.addEventListener('keydown', actions.input.keyboard.onKeyDown);
  window.addEventListener('keyup',actions. input.keyboard.onKeyUp);
  window.next = actions.global._next_stage;
};

const onDestroy = (el, props) => {
  const { actions, three, socket, loop } = props;
  socket.close();

  window.removeEventListener('keydown', actions.input.keyboard.onKeyDown)
  window.removeEventListener('keyup', actions.input.keyboard.onKeyUp)

  cube_socket.destroy(socket);
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
