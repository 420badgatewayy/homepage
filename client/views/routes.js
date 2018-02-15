import selector from "utils/selector";
import { Cube } from "./cube";

const select = (obj, ...paths) => {
  console.log(obj)
  const selected = selector(obj, ...paths);
  return {...obj.global, ...selected};
};

export default (state, actions, three, socket) => {
  switch(state.global.$stage) {
    case 0: return <Cube
      state={select(state)}
      actions={select(actions)}
      three={three}
      socket={socket}
      />
  }
};