export default (aspectRatio, boundingX, boundingY) => {
  const x = Math.min(boundingX, aspectRatio * boundingY);
  const y = 1 / aspectRatio * x;
  return {x, y};
};