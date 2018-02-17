import style from "./style.css";
import create_loop from 'utils/game-loop';

const onCreate = (el, state, actions, three, socket) => {
  socket.open('/conway');
  socket.on('connection', ()=> console.log('socket connected'));
  socket.on('disconnect', ()=> console.log('socket disconnected'));

  three.toolbelt.attachScene(el);
};

export const Conway = ({state, actions, three, socket}) => {
  return(
    <div>
      <div key="conway" 
        className={style.scene} 
        oncreate={el => onCreate(el, state, actions, three, socket)}
      />
    </div>
  )
};
