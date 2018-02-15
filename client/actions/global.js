export default {
  $next_stage: () => state => ({$stage: state.$stage +1}),
}