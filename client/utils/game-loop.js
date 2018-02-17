export default (callbacks={}, options={}) => {
  const fps = options.fps || 30;
  const step = 1000 / fps;
  const maxUpdates = options.maxUpdates || 240;
  const resetOnPanic = options.resetOnPanic || true;

  const onBegin = callbacks.onBegin || fn;
  const onComplete = callbacks.onComplete || fn;
  const update = callbacks.update || fn;
  const draw = callbacks.draw || fn;
  const panic = callbacks.panic || fn;
  
  let animationFrame = null;
  let running = false;
  let prevTime = 0;
  let deltaTime = 0;

  let loop = (time=performance.now()) => {
    animationFrame = requestAnimationFrame(loop);

    let updateSteps = 0;
    deltaTime += time - prevTime;
    prevTime = time;
    running = true;

    onBegin(time, deltaTime);
    
    while(deltaTime >= step) {
      update(step);
      deltaTime -= step;

      if(++updateSteps >= maxUpdates) {
        panic();
        if(resetOnPanic) deltaTime = 0;
        break;
      }
    }
    
    draw(deltaTime / time);
    
    return onComplete(animationFrame);
  };

  loop.stop = () => {
    cancelAnimationFrame(animationFrame);
    running = false;
  };

  loop.run = () => {
    running = true;
    prevTime = performance.now();
    animationFrame = requestAnimationFrame(loop);
  }

  loop.isRunning = () => {
    return running;
  }

  return loop;
}

function fn(){};