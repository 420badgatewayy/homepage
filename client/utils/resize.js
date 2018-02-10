import aspect from "constants/aspect";

export default renderer => {
  const ratio = aspect.x / aspect.y;
  const x = Math.min(window.innerWidth, ratio * window.innerHeight);
  const y = 1 / ratio * x;
  renderer.setSize(x, y);
};