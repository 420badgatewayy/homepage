export default (callbacks={}, options={}) => {
  const desiredFps = options.fps || 60;
  const step = 1000 / desiredFps;
  const fpsCheckRate = options.fpsCheckRate || 1000;
  const fpsDecayParam = options.fpsDecayParam || 1;
  const maxUpdates = options.maxUpdates || 240;
  const resetOnPanic = options.resetOnPanic || true;

  const onBegin = callbacks.onBegin || fn;
  const onComplete = callbacks.onComplete || fn;
  const update = callbacks.update || fn;
  const draw = callbacks.draw || fn;
  const panic = callbacks.panic || fn;
  
  let animationFrame = null;
  let running = false;
  let fps = desiredFps;
  let framesThisSecond = 0;
  let lastFpsUpdate = 0;

  let prevTime = 0;
  let deltaTime = 0;

  const loop = (time=performance.now()) => {
    animationFrame = requestAnimationFrame(loop);
    if (time < prevTime + step) {
      return{
        animationFrame,
        fps
      };
    }

    let updateSteps = 0;
    deltaTime += time - prevTime;
    prevTime = time;
    framesThisSecond++;
    running = true;

    onBegin(time, deltaTime);

    if (time > lastFpsUpdate + fpsCheckRate) {
      fps = fpsDecayParam * framesThisSecond + (1 - fpsDecayParam) * fps;
      lastFpsUpdate = time;
      framesThisSecond = 1;
    }
    
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
    
    return onComplete(
      animationFrame,
      fps
    );
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