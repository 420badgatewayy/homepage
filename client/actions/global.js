export const global = {
  $next_stage: () => state => ({$stage: state.$stage +1}),
}