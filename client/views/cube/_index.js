import style from "./style.css";
import cube_animation from "game/animations/cube.js"
import cube_socket from "sockets/cube";

const handlers = { set: function(e, fn){this[e] = fn}};

const onCreate = (el, props) => {
  const { actions, three, socket, loop } = props;
  const animation = cube_animation(three, actions);

  three.toolbelt.addAnimation(animation);
  three.toolbelt.attach(el, actions.global._set_scene_size);
  
  cube_socket.create(socket, actions);

  loop();
  
  handlers.set('mousedown', e => actions.input.mouse.onMouseDown(e));
  handlers.set('mouseup', e => actions.input.mouse.onMouseUp(e));
  handlers.set('mousemove', e => {
    actions.input.mouse.onMouseMove(e);
  })
  
  three.renderer.domElement.addEventListener('mousemove', handlers.mousemove);
  three.renderer.domElement.addEventListener('mousedown', handlers.mousedown);
  window.addEventListener('mouseup', handlers.mouseup);
};

const onDestroy = (el, props) => {
  const { actions, three, socket, loop } = props;
  socket.close();

  three.renderer.domElement.removeEventListener('mousemove', handlers.mousemove);
  three.renderer.domElement.removeEventListener('mousedown', handlers.mousedown);
  window.removeEventListener('mouseup', handlers.mouseup);

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
