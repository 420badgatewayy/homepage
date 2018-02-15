module.exports = io => {
  const attachSocket = (path, socket) => socket(path, io);
  attachSocket('/cube', require('./cube'));
}