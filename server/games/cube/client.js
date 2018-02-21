const initial_state = require('./state');
const THREE = require('three');
const ROTATION_SPEED = 2;

class Cube_Client {
  constructor(socket) {
    this.socket = socket;
    this.state = initial_state();
    this.rotateStart = new THREE.Vector3(0,0,1);
    this.rotateEnd = new THREE.Vector3(0,0,1);
    this.quaternion = new THREE.Quaternion;
  }

  emit(msg, data) {
    this.socket.emit(msg, data);
  }

  setSize(size) {
    this.state.scene.x = size.x;
    this.state.scene.y = size.y;
  }

  handleInput(input) {
    if (this.state.mouse.clicked && input.mouse.clicked) {
      const deltaX = input.mouse.x - this.state.mouse.x;
      const deltaY = input.mouse.y - this.state.mouse.y;
      this._handleRotation(deltaX, deltaY);
    }
    this.state.mouse = input.mouse;
  
    this.emit('state_change', this.state);
  }

  _handleRotation(deltaX, deltaY) {
    this.rotateEnd = this._projectOnTrackball(deltaX, deltaY);
    const rotateQuaternion = this._rotateMatrix(this.rotateStart, this.rotateEnd);
    this.quaternion.setFromEuler(this.state.rotation);
    this.quaternion.multiplyQuaternions(rotateQuaternion, this.quaternion);
    this.quaternion.normalize();
    this.state.rotation.setFromQuaternion(this.quaternion);

    this.rotateEnd = this.rotateStart;
  }

  _projectOnTrackball(touchX, touchY) {
    const mouseOnBall = new THREE.Vector3();

    mouseOnBall.set(
      clamp(touchX / this.state.scene.x / 2, -1, 1),
      clamp(-touchY / this.state.scene.y / 2, -1, 1),
      0.0
    );

    const length = mouseOnBall.length();

    if (length > 1.0) {
      mouseOnBall.normalize();
    } else {
      mouseOnBall.z = Math.sqrt(1.0 - length * length);
    }

    return mouseOnBall;
  }

  _rotateMatrix(start, end) {
    const axis = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();

    let angle = Math.acos(
      this.rotateStart.dot(this.rotateEnd) 
      / this.rotateStart.length() 
      / this.rotateEnd.length()
    );

    if (angle) {
      axis.crossVectors(this.rotateStart, this.rotateEnd).normalize();
      angle *= ROTATION_SPEED;
      quaternion.setFromAxisAngle(axis, angle);
    }

    return quaternion;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

module.exports = Cube_Client;