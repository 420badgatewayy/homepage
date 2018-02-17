export default {
  mouse: {
    set_position: (pos) => state => ({x:pos.x,y:pos.y}),
    toggle_click: () => state => !state.clicked
  },
  keyboard: {
    onKeyDown: e => state => {
      if (e.key in state) return ({[e.key]:true});
    },
    onKeyUp: e => state => {
      if (e.key in state) return ({[e.key]:false});
    }
  },
}