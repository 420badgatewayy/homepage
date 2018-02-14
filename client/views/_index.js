import { Cube } from "./cube";
import selector from "utils/selector";

const select = (obj, ...paths) => {
  const selected = selector(obj, ...paths);
  return {...obj.global, ...selected};
}

const switchView = (state, actions) => {
  switch(state.global.$stage) {
    case 0: return <Cube
      state={select(state)}
      actions={select(actions)}
      />
  }
};

export const view = (state, actions) => (
  <div key="app" id="__app">
    {switchView(state, actions)}
  </div>
);