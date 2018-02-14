import selector from "utils/selector";
import initialize_scene from "utils/initialize-three";

import { Cube } from "./cube";

const select = (obj, ...paths) => {
  const selected = selector(obj, ...paths);
  return {...obj.global, ...selected};
};

const switchView = (state, actions, three
) => {
  switch(state.global.$stage) {
    case 0: return <Cube
      state={select(state)}
      actions={select(actions)}
      three={three}
      />
  }
};

const three = initialize_scene();

export const view = (state, actions) => (
  <div key="app" id="__app">
    {switchView(state, actions, three)}
  </div>
);