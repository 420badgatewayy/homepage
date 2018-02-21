export default {
  position: {
    set_x: x => state => ({x}),
    set_y: y => state => ({y}),
    set_z: z => state => ({z}),
    incr_x: x => state => ({x: state.x + x}),
    incr_y: y => state => ({y: state.y + y}),
    incr_z: z => state => ({z: state.z + z}),
    copy: vec3 => state => ({
      x: vec3.x,
      y: vec3.y,
      z: vec3.z
    }),
  },

  rotation: {
    set_x: x => state => ({x}),
    set_y: y => state => ({y}),
    set_z: z => state => ({z}),
    incr_x: x => state => ({x: state.x + x}),
    incr_y: y => state => ({y: state.y + y}),
    incr_z: z => state => ({z: state.z + z}),
    copy: euler => state => ({
      x: euler._x,
      y: euler._y,
      z: euler._z
    }),
  },
}