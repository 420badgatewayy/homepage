export default (obj, ...paths) => {
  return paths.reduce((a, path) => {
    if (!Array.isArray(path)) {
      return {...a, [path]: obj[path]}
    }
    const finalKey = path[path.length -1]
    const val = path.reduce((a, key) => {
      if (!a[key]) throw new Error(`invalid key ${key} in path ${path}`);
      return a[key];
    }, obj);
    return {...a, [finalKey]:val}
  }, {});
}