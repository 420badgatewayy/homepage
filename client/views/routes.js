import selector from "utils/selector";
import { Cube } from "./cube";
import { Conway } from "./conway";

const select = (obj, ...paths) => {
  const selected = selector(obj, "global", ...paths);
  const get_state = obj.get_state 
    ? {get_state: obj.get_state}
    : {};
  return {...selected, ...get_state, };
};

export default (state, actions, three, socket) => {
  switch(state.global._stage) {
    case 0: return <Cube
      state={select(state, "input", "cube")}
      actions={select(actions, "input", "cube")}
      three={three}
      socket={socket}
      />;
    case 1: return <Conway
      state={select(state, "input")}
      actions={select(actions, "input")}
      three={three}
      socket={socket}
      />;
  }
};