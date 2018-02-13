const getKeys = (obj, ...paths) => {
  return paths.reduce((a, path) => {
    if (!Array.isArray(path)) {
      return {...a, [path]: obj[path]}
    }
    const finalKey = path[path.length -1]
    const val = path.reduce((a, key) => {
      if (!a[key]) throw new Error(`invalid key ${key} in path ${path}`);
      return a[key];
    }, obj);
    return {...a, [finalKey]:val}
  }, obj.global);
}

////
const Test = ({state, actions}) => {
  return (
    <div>
      <button onclick={()=>console.log(state)}>TEST</button>
      <button onclick={actions.$next_stage}>INC</button>
    </div>
  )
}
////

const switchView = (state, actions) => {
  return (
    <Test 
      state={getKeys(state, ["yes", "exists"], "yup")}
      actions={getKeys(actions)}>
    </Test>
  );
};

export const view = (state, actions) => (
  <div key="app" id="__app">
    {switchView(state, actions)}
  </div>
);