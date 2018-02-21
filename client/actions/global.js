export default {
  _next_stage: () => state => ({_stage: state._stage +1}),
  _set_scene_size: _scene_size => state => ({_scene_size}),
}