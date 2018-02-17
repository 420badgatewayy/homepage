import io from 'socket.io-client';
import initialize_three from "game/initialize-three";
import get_socket from "sockets";
import create_loop from 'utils/game-loop';
import router from "./routes";

const three = initialize_three();
const socket = get_socket();

const draw = three.toolbelt.draw;
const update = deltaTime => {
  three.toolbelt.updateAnimations(deltaTime);
  // socket.sendInput(deltaTime);
};

const loop = create_loop({update, draw});

export const view = (state, actions) => (
  <div key="app" id="__app">
    {router(state, actions, three, socket, loop)}
  </div>
);