import global from './global';
import input from './input';
import cube from './cube';

const addGetters = actions => {
  actions.get_state = () => state => state;
  Object.keys(actions).forEach(key => {
    if (typeof actions[key] === "object") {
      addGetters(actions[key]);
    }
  });
  return actions;
}

export const actions = addGetters({
  global,
  input,
  cube,
});