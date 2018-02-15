import io from 'socket.io-client';
import initialize_three from "game/initialize-three";
import get_socket from "sockets";
import router from "./routes";

const three = initialize_three();
const socket = get_socket();

export const view = (state, actions) => (
  <div key="app" id="__app">
    {router(state, actions, three, socket)}
  </div>
);