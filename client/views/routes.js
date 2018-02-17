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

export default (state, actions, three, socket, loop) => {
  const stages = [
    Cube, 
    Conway
  ]
  const Stage = stages[state.global._stage];
  return <Stage
    state={select(state, "input", "cube")}
    actions={select(actions, "input", "cube")}
    three={three}
    socket={socket}
    loop={loop}
    />
};