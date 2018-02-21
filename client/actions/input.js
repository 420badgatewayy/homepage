export default {
  mouse: {
    onMouseMove: e => state => ({x:e.offsetX,y:e.offsetY}),
    onMouseDown: () => state => ({clicked: true}),
    onMouseUp: () => state => ({clicked: false}),
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