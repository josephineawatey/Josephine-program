function keys(obj) {
  return Object.keys(obj);
}
function values(obj) {
  return Object.values(obj);
}
function invert(obj) {
  const inv = {};
  for (const k in obj) inv[obj[k]] = k;
  return inv;
}
module.exports = { keys, values, invert };